/**
 * @typedef Rgb
 * @prop {number} r defines the red value.
 * @prop {number} g defines the green value.
 * @prop {number} b defines the blue value.
 */

/**
 * Class that represents a color inside the application.
 */
export class Color {
  constructor(hex) {
    this.hex = hex

    const rbg = this._hexToRgb(hex)
    this.r = rbg.r
    this.g = rbg.g
    this.b = rbg.b
  }

  // TODO: Maybe we can convert a rgb to hex and the hex to rgb whenever some property change it value.

  /**
   * Method that converts a hex value to an object that contains the properties `r`, `g` and `b`.
   *
   * @param {string} hex defines the hexadecimal color value.
   * @returns {Rgb} an object that represents the hex in rgba.
   */
  _hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)

    if (result) {
      return {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    }

    return null
  }
}
