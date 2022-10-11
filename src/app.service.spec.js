import { AppService } from './app.service'

describe('AppService', () => {
  let service

  beforeEach(() => {
    service = new AppService()
  })

  it('should return "pong"', () => {
    const res = service.ping()
    expect(res).toBe('pong')
  })
})
