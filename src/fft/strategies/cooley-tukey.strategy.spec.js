import { Complex } from '../../common/classes/complex'
import { CooleyTukeyStrategy } from './cooley-tukey.strategy'

describe('CooleyTukeyStrategy', () => {
  /**
   * @type {CooleyTukeyStrategy}
   */
  let radix2

  beforeEach(() => {
    radix2 = new CooleyTukeyStrategy()
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
