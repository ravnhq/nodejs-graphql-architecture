import { UserService } from './users.service'

describe('AuthService', () => {
  let authService: UserService
  beforeAll(() => {
    authService = new UserService()
  })
  it('should be defined', () => {
    expect(authService).toBeDefined()
  })
})
