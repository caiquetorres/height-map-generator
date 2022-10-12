import { HeightMapService } from './height-map.service'

describe('HeightMapService', () => {
  /**
   * @type {HeightMapService}
   */
  let service

  beforeEach(() => {
    service = new HeightMapService()
  })

  it('should generate a height map', async () => {
    const image = await service.generateHeighMap(128)

    expect(image.bitmap).toHaveProperty('height', 128)
    expect(image.bitmap).toHaveProperty('width', 128)
  })

  it('should normalized a signal', () => {
    const signal = [1000, 250, 255, 0]
    expect(service._normalize(signal)).toEqual([255, 63.75, 65.025, 0])
  })
})
