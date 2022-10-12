/**
 * Class that represents a one dimensional `Nyquist Serie`.
 */
export class Nyquist1D extends Array {
  constructor(length) {
    super()

    let start = 0
    let end = length / 2 - 1

    for (let i = start; i <= end; i++) {
      this.push(i / length)
    }

    start = -length / 2
    end = -1

    for (let i = start; i <= end; i++) {
      this.push(i / length)
    }
  }
}

/**
 * Class that represents a second dimensional `Nyquist Serie`.
 */
export class Nyquist2D extends Array {
  constructor(length) {
    super(length)

    for (let i = 0; i < length; i++) {
      this[i] = new Array(length)
    }

    const nyquist = new Nyquist1D(length)

    for (let y = 0; y < length; y++) {
      for (let x = 0; x < length; x++) {
        this[y][x] = Math.sqrt(
          nyquist[y] * nyquist[y] + nyquist[x] * nyquist[x],
        )
      }
    }
  }
}
