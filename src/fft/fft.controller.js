import { HttpException } from '../common/errors/http.exception'

import { FftService } from './fft.service'

/**
 * Class responsible for dealing with all the routes related fft image conversion.
 */
export class FftController {
  constructor() {
    /**
     * @private
     */
    this._fftService = new FftService()

    /**
     * @private
     */
    this._allowedMimetypes = new Set(['image/jpg', 'image/jpeg', 'image/png'])
  }

  /**
   * Method that applies the `Fast Fourier Transform`.
   *
   * @param {import("express").Request} req defines the express request.
   * @param {import("express").Response} res defines the express response.
   */
  async transform(req, res) {
    const file = req.file

    if (!file) {
      throw new HttpException(400, 'The file must be defined')
    }

    if (!file.buffer) {
      throw new HttpException(400, 'The file be a file')
    }

    if (!this._allowedMimetypes.has(file.mimetype)) {
      throw new HttpException(415, 'The file type must be an image')
    }

    let contrast

    if (req.body.contrast !== undefined) {
      contrast = +req.body.contrast

      if (contrast === 0) {
        throw new HttpException(
          400,
          'The contrast must have a value different from 0',
        )
      }

      if (isNaN(contrast) || typeof contrast !== 'number') {
        throw new HttpException(400, 'The contrast must be a number')
      }
    }

    contrast ??= 9e-3

    // TODO: Map the contrast property

    const image = await this._fftService.transform(file.buffer.buffer, contrast)

    const mimetype = image.getMIME()
    const buffer = await image.getBufferAsync(mimetype)

    res.set('Content-Type', mimetype).send(buffer)
  }
}
