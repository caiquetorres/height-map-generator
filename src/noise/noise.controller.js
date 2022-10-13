import { HttpException } from '../common/errors/http.exception'

import { NoiseService } from './noise.service'

/**
 * Class responsible for dealing with all the routes related with the noise generation.
 */
export class NoiseController {
  constructor() {
    /**
     * @private
     */
    this._noiseService = new NoiseService()
  }

  /**
   * Method that, given a size and a seed (optional), generates a white noise.
   *
   * @param {import("express").Request} req defines the express request.
   * @param {import("express").Response} res defines the express response.
   */
  async generateWhiteNoiseImage(req, res) {
    const { size, seed } = req.body

    if (size === null || size === undefined) {
      throw new HttpException(400, 'The size must be defined')
    }

    if (typeof size !== 'number') {
      throw new HttpException(400, 'The size must be a number')
    }

    if (seed !== undefined) {
      if (typeof seed !== 'string' && typeof seed !== 'number') {
        throw new HttpException(400, 'The seed must be a string or a number')
      }
    }

    const noiseImage = await this._noiseService.generateWhiteNoiseImage(
      size,
      seed,
    )

    const mimetype = noiseImage.getMIME()
    const buffer = await noiseImage.getBufferAsync(mimetype)

    res.set('Content-Type', mimetype).send(buffer)
  }
}
