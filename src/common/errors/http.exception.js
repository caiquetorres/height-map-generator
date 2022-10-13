/**
 * Exception that represents any kind of exception/error thrown inside of
 * the application.
 */
export class HttpException {
  /**
   * @param {number} statusCode
   * @param {string} message
   * @param {string} stackTrace
   */
  constructor(statusCode, message, stackTrace) {
    this.statusCode = statusCode
    this.message = message
    this.stackTrace = stackTrace
  }
}
