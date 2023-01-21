import dotenv from 'dotenv'

/**
 * Class that represents the .env file to help with the
 * autocomplete when environments variables are needed
 */
export class Env {
  /**
   * From the interface Model, return from the .env the value of the passed variable
   *
   * @param {string} key Represents the environment variable that will be used
   * @returns {string} The value of the request environment variable
   */
  static get(key) {
    return process.env[key]
  }

  /**
   * Run .env configuration
   */
  static config() {
    dotenv.config()
  }
}
