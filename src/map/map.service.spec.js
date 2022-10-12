import { MapService } from './map.service'

describe('HeightMapService', () => {
  /**
   * @type {MapService}
   */
  let service

  beforeEach(() => {
    service = new MapService()
  })

  it('should generate a height map', async () => {
    const image = await service.generateHeighMap(128)

    expect(image.bitmap).toHaveProperty('height', 128)
    expect(image.bitmap).toHaveProperty('width', 128)
  })

  it('should generate a color map', async () => {
    const image = await service.generateColorMap(128)

    expect(image.bitmap).toHaveProperty('height', 128)
    expect(image.bitmap).toHaveProperty('width', 128)
  })

  it('should normalized a signal', () => {
    const signal = [1000, 250, 255, 0]
    expect(service._normalize(signal)).toEqual([255, 63.75, 65.025, 0])
  })
})
