import Jimp from 'jimp'
import seedrandom from 'seedrandom'

/**
 * Service responsible for handling some useful logics related with noise
 * generation and processing.
 */
export class NoiseService {
  /**
   * Method that, given a size and a seed (optional), generates a white noise.
   *
   * @param {number} size defines the generated image width and height.
   * @param {number | string | undefined} seed defines a value that will be used to generate the white noise. Equal values always will generate equal noises. If the value is undefined then the white noise will be random.
   * @returns an image that contains the generated image.
   */
  async generateWhiteNoiseImage(size, seed) {
    const whiteNoise = this._generateWhiteNoise(size, seed)
    const image = await this._signalToImage(whiteNoise)
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
   * Method that generates a new white noise, given it size.
   *
   * @private
   *
   * @param {number} size defines the height map width and height.
   * @param {number | string | undefined} seed defines a value that will be used to generate the white noise. Equal values always will generate equal noises. If the value is undefined then the white noise will be random.
   * @returns {number[]} an array that contains the generated noise.
   */
  _generateWhiteNoise(size, seed) {
    const signal = []
    const random = seedrandom(seed)

    for (let y = 0; y < 4 * size; y++) {
      for (let x = 0; x < size; x += 4) {
        const value = Math.floor(random() * 255)

        for (let c = 0; c < 3; c++) {
          signal[y * size + x + c] = value
        }
        signal[y * size + x + 3] = 255
      }
    }

    return signal
  }
}
