import { Complex } from '../common/classes/complex'
import { Fft } from './fft'
import Jimp from 'jimp'

/**
 * Service that handles any application business logic related with the `Fourier Transform`.
 */
export class FftService {
  constructor() {
    /**
     * @private
     */
    this._fft = new Fft()
  }

  /**
   * @param {Buffer} buffer
   * @param {number | undefined} contrast
   */
  async transform(buffer, contrast) {
    const image = await Jimp.read(buffer)
    const pixelData = Array.from(image.bitmap.data)

    const frequencies = this._fft.transform(pixelData)

    this._fft.swapQuadrants(frequencies)
    this._fft.shift(frequencies)

    image.bitmap.data = this._fromComplexArray(frequencies, contrast)

    return image
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
   * @private
   *
   * @param {Complex[]} frequencies
   * @param {number} contrast
   * @returns {number[]}
   */
  _fromComplexArray(frequencies, contrast) {
    const size = Math.sqrt(frequencies.length)
    const magnitudes = frequencies
      .filter((c) => !!c)
      .map((c) => (c ? c.magnitude : 0))

    // O (n)
    let maxMagnitude = magnitudes[0]
    for (const magnitude of magnitudes) {
      if (magnitude > maxMagnitude) {
        maxMagnitude = magnitude
      }
    }

    const logOfMaxMag = Math.log(contrast * maxMagnitude + 1)
    const data = new Array(frequencies.length)
    data.fill(0)

    // O (n)
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        const indexInPixels = 4 * (y * size + x)
        data[indexInPixels + 3] = 255 // full alpha

        let color = Math.log(
          contrast * frequencies[y * size + x]?.magnitude ?? 0 + 1,
        )
        color = Math.round(255 * (color / logOfMaxMag))

        for (let c = 0; c < 3; c++) {
          data[indexInPixels + c] = color
        }
      }
    }

    return data
  }
}
