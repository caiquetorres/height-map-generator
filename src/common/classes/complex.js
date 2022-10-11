/**
 * Class that represents a complex number.
 */
export class Complex {
  /**
   * Property that defines the complex number module of magnitude, it is
   * defined as the vector length.
   */
  get magnitude() {
    return Math.sqrt(this.real * this.real + this.imaginary * this.imaginary)
  }

  constructor(real, imaginary) {
    this.real = real
    this.imaginary = imaginary
  }

  /**
   * Method that, given an angle, returns a complex number using the `cis` notation.
   *
   * @param {number} angle defines the angle that will be converted.
   * @returns {Complex} a complex number, represented by the given angle.
   */
  static fromAngle(angle) {
    return new Complex(Math.cos(angle), Math.sin(angle))
  }

  /**
   * Method that sums a complex number into another complex number.
   *
   * @param {Complex} z defines the complex number that will be added to.
   * @returns {Complex} a new complex number that represents the result of the sum between the current complex number and the one given through the `z` parameter.
   */
  plus(z) {
    return new Complex(this.real + z.real, this.imaginary + z.imaginary)
  }

  /**
   * Method that subtracts a complex number from another complex number.
   *
   * @param {Complex} z defines the complex number that will be subtracted of.
   * @returns {Complex} a new complex number that represents the result of the subtraction between the current complex number and the one given through the `z` parameter.
   */
  minus(z) {
    return new Complex(this.real - z.real, this.imaginary - z.imaginary)
  }

  /**
   * Method that multiples a complex number and another complex number.
   *
   * @param {number | Complex} z defines the number or a the complex number that will be multiplied by.
   * @returns {Complex} a new complex number that represents the result of the multiplication between the current complex number and the one given through the `z` parameter.
   */
  times(z) {
    if (typeof z === 'object') {
      const realPart = this.real * z.real - this.imaginary * z.imaginary
      const imaginaryPart = this.real * z.imaginary + this.imaginary * z.real
      return new Complex(realPart, imaginaryPart)
    } else {
      return new Complex(z * this.real, z * this.imaginary)
    }
  }
}
