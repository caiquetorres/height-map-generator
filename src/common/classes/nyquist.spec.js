import { Nyquist1D, Nyquist2D } from './nyquist'

describe('Nyquist', () => {
  it('should generate a valid one dimensional nyquist serie', () => {
    const nyquist1D = new Nyquist1D(4)
    expect(nyquist1D).toEqual([0, 0.25, -0.5, -0.25])
  })

  it('should generate a valid two dimensional nyquist serie', () => {
    const nyquist2D = new Nyquist2D(4)
    expect(nyquist2D).toEqual([
      [0, 0.25, 0.5, 0.25],
      [0.25, 0.3535533905932738, 0.5590169943749475, 0.3535533905932738],
      [0.5, 0.5590169943749475, 0.7071067811865476, 0.5590169943749475],
      [0.25, 0.3535533905932738, 0.5590169943749475, 0.3535533905932738],
    ])
  })
})
