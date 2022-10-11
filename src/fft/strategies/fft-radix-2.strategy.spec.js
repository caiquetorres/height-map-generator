import { Complex } from '../../common/classes/complex'
import { FftRadix2 } from './fft-radix-2.strategy'

describe('FftRadix2', () => {
  /**
   * @type {FftRadix2}
   */
  let radix2

  beforeEach(() => {
    radix2 = new FftRadix2()
  })

  it('should convert a signal to an array of complex numbers', () => {
    const signal = [4, 4, 4, 4]
    const frequencies = [
      new Complex(16, 0),
      new Complex(0, 0),
      new Complex(0, 0),
      new Complex(0, 0),
    ]

    expect(radix2.transform(signal)).toEqual(frequencies)
  })

  it('should convert a frequency array (complex) to a signal', () => {
    const signal = [4, 4, 4, 4]
    const frequencies = [
      new Complex(16, 0),
      new Complex(0, 0),
      new Complex(0, 0),
      new Complex(0, 0),
    ]

    expect(radix2.inverseTransform(frequencies)).toEqual(signal)
  })
})
