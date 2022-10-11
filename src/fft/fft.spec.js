import { Fft } from './fft'

describe('Fft', () => {
  /**
   * @type {Fft}
   */
  let fft

  beforeEach(() => {
    fft = new Fft()
  })

  it('should swap the quadrants', () => {
    const signal = [
      [1, 2, 3, 4],
      [5, 6, 7, 8],
      [1, 2, 3, 4],
      [5, 6, 7, 8],
    ].flat()

    fft.swapQuadrants(signal)

    expect(signal).toEqual(
      [
        [3, 4, 1, 2],
        [7, 8, 5, 6],
        [3, 4, 1, 2],
        [7, 8, 5, 6],
      ].flat(),
    )
  })
})
