import { HttpException } from '../common/errors/http.exception'

import { MapService } from './map.service'

export class MapController {
  constructor() {
    /**
     * @private
     */
    this._mapService = new MapService()
  }

  /**
   * Method that generates a new height map given it size, seed and roughness.
   *
   * @param {import("express").Request} req defines the express request.
   * @param {import("express").Response} res defines the express response.
   */
  async generateHeightMap(req, res) {
    const { size, roughness, seed } = req.body

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

    if (roughness !== undefined) {
      if (typeof roughness !== 'number') {
        throw new HttpException(400, 'The roughness must be a number')
      }
    }

    const noiseImage = await this._mapService.generateHeighMap(
      size,
      seed,
      roughness,
    )
    const buffer = await noiseImage.getBufferAsync('image/jpeg')

    res.set('Content-Type', 'image/jpeg').send(buffer)
  }

  /**
   * Method that generates a new color map given it size, seed and roughness.
   *
   * @param {import("express").Request} req defines the express request.
   * @param {import("express").Response} res defines the express response.
   */
  async generateColorMap(req, res) {
    const { size, roughness, seed } = req.body

    if (size === null || size === undefined) {
      throw new HttpException(400, 'The size must be defined')
    }

    if (typeof size !== 'number') {
      throw new HttpException(400, 'The size must be a number')
    }

    if (seed) {
      if (typeof seed !== 'string' && typeof seed !== 'number') {
        throw new HttpException(
          400,
          'The roughness must be a string or a number',
        )
      }
    }

    if (roughness !== undefined) {
      if (typeof roughness !== 'number') {
        throw new HttpException(400, 'The roughness must be a number')
      }
    }

    const noiseImage = await this._mapService.generateColorMap(
      size,
      seed,
      roughness,
    )
    const buffer = await noiseImage.getBufferAsync('image/jpeg')

    res.set('Content-Type', 'image/jpeg').send(buffer)
  }
}
