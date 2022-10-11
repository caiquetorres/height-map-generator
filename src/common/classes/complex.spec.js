import { Complex } from './complex'

describe('Complex', () => {
  it('should get the complex magnitude', () => {
    const c = new Complex(2, 2)
    expect(c.magnitude).toBe(Math.sqrt(8))
  })

  it('should add a complex number to another complex number', () => {
    const c1 = new Complex(1, 1)
    const c2 = new Complex(1, 1)
    const sum = c1.plus(c2)

    expect(sum).toEqual(new Complex(2, 2))
  })

  it('should subtract a complex number to another complex number', () => {
    const c1 = new Complex(1, 1)
    const c2 = new Complex(1, 1)
    const sub = c1.minus(c2)

    expect(sub).toEqual(new Complex(0, 0))
  })

  it('should multiply a complex number to a real number', () => {
    const c1 = new Complex(1, 1)
    const factor = 2
    const mult = c1.times(factor)

    expect(mult).toEqual(new Complex(2, 2))
  })

  it('should multiply a complex number by another complex number', () => {
    const c1 = new Complex(2, 2)
    const c2 = new Complex(3, 3)
    const mult = c1.times(c2)

    expect(mult).toEqual(new Complex(0, 12))
  })
})
