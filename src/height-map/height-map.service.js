import { NoiseService } from '../noise/noise.service'

import { Nyquist2D } from '../common/classes/nyquist'
import { Fft } from '../fft/fft'
import Jimp from 'jimp'

export class HeightMapService {
  constructor() {
    this.fft = new Fft()
    this.noise = new NoiseService()
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

    const whiteNoise = await this.noise.generateWhiteNoiseImage(size, seed)
    const pixelData = whiteNoise.bitmap.data
    const frequencies = this.fft.transform(pixelData)
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

    const resultSignal = this.fft.inverseTransform(frequencies)
    const normalizedSignal = this._normalize(resultSignal)

    const image = await this._signalToImage(normalizedSignal).then((res) =>
      res.resize(2 * size, size).crop(0, 0, size, size),
    )

    return image
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
    const size = Math.sqrt(signal.length / 4)
    const image = await Jimp.create(size, size, 0)

    image.bitmap.data = signal

    return image
  }

  /**
   * Method that normalizes an signal based on it maximum and minimum values.
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
