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
}
