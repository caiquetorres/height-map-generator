import { HttpException } from '../common/errors/http.exception'

import { NoiseService } from '../noise/noise.service'

import { Nyquist2D } from '../common/classes/nyquist'
import { Fft } from '../fft/fft'
import { Color } from './classes/color'
import { Level } from './classes/level'
import Jimp from 'jimp'

/**
 * Service responsible for handling any logic related with height maps generation.
 */
export class MapService {
  constructor() {
    /**
     * @private
     */
    this._fft = new Fft()

    /**
     * @private
     */
    this._noise = new NoiseService()
  }

  /**
   * Method that generates a new height map given it size, seed and roughness.
   *
   * @param {number} size defines the height map dimension.
   * @param {number | string} [seed] defines the base value to generate the height map. Equal values always generate equal height maps.
   * @param {number} [roughness] defines the detail level of the height map.
   * @returns {Promise<Jimp>} a signal that represents the generated height map.
   */
  async generateHeighMap(size, seed, roughness) {
    roughness ??= 2.4

    if (!this._isPowerOfTwo(size)) {
      throw new HttpException(400, 'The size must be a power of two')
    }

    const whiteNoise = await this._noise.generateWhiteNoiseImage(size, seed)
    const pixelData = Array.from(whiteNoise.bitmap.data)
    const frequencies = this._fft.transform(pixelData)
    const width = Math.sqrt(frequencies.length)

    const nyquist2d = new Nyquist2D(width)

    // 1/f filter
    for (let y = 0; y < width; y++) {
      for (let x = 0; x < width; x++) {
        const divider = Math.pow(nyquist2d[y][x], roughness) * width

        if (!divider) {
          frequencies[y * width + x].real = 0
          frequencies[y * width + x].imaginary = 0
        } else {
          frequencies[y * width + x].real /= divider
          frequencies[y * width + x].imaginary /= divider
        }
      }
    }

    const resultSignal = this._fft.inverseTransform(frequencies)
    const normalizedSignal = this._normalize(resultSignal)

    const image = await this._signalToImage(normalizedSignal).then((res) =>
      res.resize(2 * size, size).crop(0, 0, size, size),
    )

    return image
  }

  /**
   * Method that generates a new color map given it size, seed and roughness.
   *
   * @param {number} size defines the height map dimension.
   * @param {number | string} [seed] defines the base value to generate the height map. Equal values always generate equal height maps.
   * @param {number} [roughness] defines the detail level of the height map.
   * @returns {Promise<Jimp>} a signal that represents the generated color map.
   */
  async generateColorMap(size, seed, roughness) {
    const heightMap = await this.generateHeighMap(size, seed, roughness)

    const colorMap = heightMap.clone()
    const pixelData = colorMap.bitmap.data

    const levels = [
      new Level(0, 80, new Color('#3228c8')), // deep sea
      new Level(80, 90, new Color('#0f6ec8')), // flat sea
      new Level(90, 110, new Color('#FFFB9D')), // sand
      new Level(140, 175, new Color('#288A2E')), // dark grass
      new Level(110, 140, new Color('#174D1A')), // light grass
      new Level(175, 200, new Color('#8D8D8D')), // light rock
      new Level(200, 220, new Color('#525252')), // dark rock
      new Level(220, 255, new Color('#ffffff')), // snow
    ]

    for (let i = 0; i < pixelData.length; i += 4) {
      for (const level of levels) {
        if (pixelData[i] < level.min || pixelData[i] >= level.max) {
          continue
        }

        pixelData[i] = level.color.r
        pixelData[i + 1] = level.color.g
        pixelData[i + 2] = level.color.b
        pixelData[i + 3] = 255
      }
    }

    return colorMap
  }

  /**
   * Method that says if the given number is power of two or not.
   *
   * @private
   *
   * @param {number} n defines the number that will be validated.
   * @returns {boolean} true if the number is power of two, otherwise false.
   */
  _isPowerOfTwo(n) {
    return !!n && !(n & (n - 1))
  }

  /**
   * Method that converts a signal, represented by a 1d number array, to a
   * `Jimp` image.
   *
   * @private
   *
   * @param {number[]} signal defines an array that contains all the signal data.
   * @returns an object that represents an image.
   */
  async _signalToImage(signal) {
    // REVIEW: Move this method to some class

    const size = Math.sqrt(signal.length / 4)
    const image = await Jimp.create(size, size, 0)

    image.bitmap.data = signal

    return image
  }

  /**
   * Method that normalizes an signal based on it maximum and minimum values.
   *
   * @private
   *
   * @param {number[]} signal defines an array that represents the signal
   * @returns {number[]} an array that represents the normalized signal.
   */
  _normalize(signal) {
    let min = signal[0]
    let max = signal[0]

    for (const value of signal) {
      if (value < min) {
        min = value
      }

      if (value > max) {
        max = value
      }
    }

    for (let i = 0; i < signal.length; i++) {
      signal[i] = 255 * ((signal[i] - min) / (max - min))
    }

    return signal
  }
}
