import { NoiseService } from './noise.service'

describe('NoiseService', () => {
  /**
   * @type {NoiseService}
   */
  let service

  beforeEach(() => {
    service = new NoiseService()
  })

  it('should generate a image with 128x128', async () => {
    const image = await service.generateWhiteNoiseImage(128)

    expect(image).toHaveProperty('bitmap')
    expect(image.bitmap).toHaveProperty('width', 128)
    expect(image.bitmap).toHaveProperty('height', 128)
  })
})
