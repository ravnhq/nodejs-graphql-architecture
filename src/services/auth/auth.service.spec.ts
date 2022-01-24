import { AuthService } from './auth.service'

describe('AuthService', () => {
  let authService: AuthService
  beforeAll(() => {
    authService = new AuthService()
  })
  it('should be defined', () => {
    expect(authService).toBeDefined()
  })
})
