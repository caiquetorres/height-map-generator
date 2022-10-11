import { Complex } from '../../common/classes/complex'

/**
 * Class that contains all the logic related with the `Fast Fourier Transform` using the `fft radix 2` algorithm.
 */
export class FftRadix2 {
  /**
   * Method that applies the `Fast Fourier Transform`.
   *
   * @param {number[]} signal defines a one dimensional array that contains all the signal values.
   * @returns {Complex[]} a complex number array with the signal converted to the frequency domain.
   */
  transform(signal) {
    const output = []

    // O(n * log(n))
    _fftRadix2(0, 0, signal.length, 1)

    return output

    /**
     * Function that applies the `fft radix 2` algorithm for getting the
     * `Fast Fourier Transform` on the `signal` parameter.
     *
     * The current complexity of the algorithm is O(n * log(n)).
     *
     * @param {number} start defines the output start position.
     * @param {number} offset defines the input offset.
     * @param {number} size defines the size of the current array portion.
     * @param {number} s :/
     */
    function _fftRadix2(start, offset, size, s) {
      if (size === 1) {
        output[start] = new Complex(signal[offset], 0)
        return
      }

      _fftRadix2(start, offset, size / 2, 2 * s)
      _fftRadix2(start + size / 2, offset + s, size / 2, 2 * s)

      for (let i = 0; i < size / 2; i++) {
        const twiddle = Complex.fromAngle((-2 * Math.PI * i) / size)
        const t = output[start + i]

        output[start + i] = t.plus(twiddle.times(output[start + i + size / 2]))
        output[start + i + size / 2] = t.minus(
          twiddle.times(output[start + i + size / 2]),
        )
      }
    }
  }

  /**
   * Method that applies the `Inverse Fast Fourier Transform`.
   *
   * @param {Complex[]} frequencies defines the signal in the frequency domain.
   * @returns {number[]} an array that represents the frequency array converted to signal.
   */
  inverseTransform(frequencies) {
    const output = []

    // O(n * log(n))
    _invFftRadix2(0, 0, frequencies.length, 1)

    return output.map((s) => s.real / output.length)

    /**
     * Function that applies the `inverse fft radix 2` algorithm for
     * getting the `Fast Fourier Transform` on the `signal` parameter.
     *
     * The current complexity of the algorithm is O(n * log(n)).
     *
     * @param {number} start defines the output start position.
     * @param {number} offset defines the input offset.
     * @param {number} size defines the size of the current array portion.
     * @param {number} s :/
     */
    function _invFftRadix2(start, offset, size, s) {
      if (size === 1) {
        output[start] = signal[offset]
        return
      }

      _invFftRadix2(start, offset, size / 2, 2 * s)
      _invFftRadix2(start + size / 2, offset + s, size / 2, 2 * s)

      for (let i = 0; i < size / 2; i++) {
        const twiddle = Complex.fromAngle((2 * Math.PI * i) / size)
        const t = output[start + i]

        output[start + i] = t.plus(twiddle.times(output[start + i + size / 2]))
        output[start + i + size / 2] = t.minus(
          twiddle.times(output[start + i + size / 2]),
        )
      }
    }
  }
}
