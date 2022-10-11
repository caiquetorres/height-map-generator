import { Complex } from '../common/classes/complex'
import { FftRadix2 } from './strategies/fft-radix-2.strategy'

/**
 * Class that contains all logic related with the `Fast Fourier Transform`.
 */
export class Fft {
  constructor(strategy) {
    /**
     * Property that defines an object that contains the strategy that will be used to apply the `Fourier Transform` in any signal passed to this class methods.
     *
     * @private
     * @type {FftRadix2}
     */
    this.strategy = strategy ?? new FftRadix2()
  }

  /**
   * Method that applies the `Fourier Transform`.
   *
   * @param {number[]} signal defines a one dimensional array that contains all the signal values.
   * @returns {Complex[]} a complex number array with the signal converted to the frequency domain.
   */
  transform(signal) {
    return this.strategy.transform(signal)
  }

  /**
   * Method that applies the `Inverse Fourier Transform`.
   *
   * @param {Complex[]} frequencies defines the signal in the frequency domain.
   * @returns {number[]} an array that represents the frequency array converted to signal.
   */
  inverseTransform(frequencies) {
    return this.strategy.inverseTransform(frequencies)
  }

  /**
   * Method that swaps the first with the third quadrant and the second with the fourth one.
   *
   * @param {unknown[]} signal defines an array.
   */
  swapQuadrants(signal) {
    const size = Math.sqrt(signal.length)

    for (let y = 0; y < size / 2; y++) {
      for (let x = 0; x < size / 2; x++) {
        const index1 = y * size + x
        const index2 = (y + size / 2) * size + (x + size / 2)

        const aux = signal[index1]
        signal[index1] = signal[index2]
        signal[index2] = aux
      }
    }

    for (let y = 0; y < size / 2; y++) {
      for (let x = size / 2; x < size; x++) {
        const index1 = y * size + x
        const index2 = (y + size / 2) * size + (x - size / 2)

        const aux = signal[index1]
        signal[index1] = signal[index2]
        signal[index2] = aux
      }
    }
  }

  /**
   * Method that shifts the array values to the center using the transforms 3/8 for height and 1/4 for width.
   *
   * @param {unknown[]} signal defines an array.
   */
  shift(signal) {
    const size = Math.sqrt(signal.length)

    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        const index1 = y * size + x
        const index2 = (y + (3 * size) / 8) * size + (x + size / 4)

        signal[index1] = signal[index2]
      }
    }
  }
}
