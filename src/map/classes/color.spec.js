import { Color } from './color'

describe('Color', () => {
  it('should convert the hex #000000', () => {
    const color = new Color('#000000')

    expect(color).toHaveProperty('r', 0)
    expect(color).toHaveProperty('g', 0)
    expect(color).toHaveProperty('b', 0)
  })

  it('should convert the hex #c832c8', () => {
    const color = new Color('#c832c8')

    expect(color).toHaveProperty('r', 200)
    expect(color).toHaveProperty('g', 50)
    expect(color).toHaveProperty('b', 200)
  })

  it('should convert the hex #ffffff', () => {
    const color = new Color('#ffffff')

    expect(color).toHaveProperty('r', 255)
    expect(color).toHaveProperty('g', 255)
    expect(color).toHaveProperty('b', 255)
  })
})
