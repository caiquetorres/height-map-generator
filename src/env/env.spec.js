import { Env } from './env'

describe('Env', () => {
  let OLD_ENV

  beforeEach(() => {
    OLD_ENV = { ...process.env }
    Object.assign(process.env, {
      PORT: 8100,
    })
  })

  it('should get the PORT with value 8100', () => {
    expect(Env.get('PORT')).toBe('8100')
  })

  afterEach(() => {
    Object.assign(process.env, OLD_ENV)
  })
})
