import { Auth, TypeUser, User } from '@prisma/client'
import { plainToClass } from 'class-transformer'
import faker from 'faker'
import { Unauthorized, BadRequest } from 'http-errors'
import { clearDatabase, prisma } from '../../prisma'
import { UserFactory } from '../../utils/factories/user.factory'
import { AuthService } from './auth.service'
import { LoginDto } from './dtos/request/login.dto'

describe('AuthService', () => {
  let userFactory: UserFactory

  beforeAll(() => {
    userFactory = new UserFactory(prisma)
  })

  beforeEach(async () => {
    jest.clearAllMocks()
  })

  afterAll(async () => {
    await clearDatabase()
    await prisma.$disconnect()
  })

  describe('login', () => {
    let password: string
    let user: User
    beforeAll(async () => {
      password = faker.internet.password()

      user = await userFactory.make({ password })
    })

    it('should throw an error if the credentials are invalid', async () => {
      const fakePassword = faker.internet.password()
      await expect(
        AuthService.login(plainToClass(LoginDto, { email: user.email, password: fakePassword })),
      ).rejects.toThrowError(new Unauthorized('The credentials are incorrect'))
    })

    it('should throw an error if the user was not exist', async () => {
      const fakeEmail = faker.internet.email()
      const fakePassword = faker.internet.password()
      await expect(
        AuthService.login(plainToClass(LoginDto, { email: fakeEmail, password: fakePassword })),
      ).rejects.toThrowError(new Error('No User found'))
    })

    it('should create the token and return it', async () => {
      const spyPrisma = jest.spyOn(prisma.auth, 'create')

      const result = await AuthService.login(plainToClass(LoginDto, { email: user.email, password }))

      expect(spyPrisma).toHaveBeenCalledWith({ data: { userId: user.id } })
      expect(result).toHaveProperty('accessToken')
    })
  })

  describe('generateJWT', () => {
    it('should return the JWT', () => {
      const result = AuthService.generateJWT({ jti: '' })
      expect(result).toBeDefined()
    })
  })

  describe('validateAdmin', () => {
    let password: string
    let clientUser: User
    let clientAuth: Auth
    let managerUser: User
    let managerAuth: Auth

    beforeAll(async () => {
      password = faker.internet.password()
      clientUser = await userFactory.make({ type: TypeUser.CLIENT, password })
      clientAuth = await prisma.auth.create({ data: { userId: clientUser.id } })
      managerUser = await userFactory.make({ type: TypeUser.MANAGER, password })
      managerAuth = await prisma.auth.create({ data: { userId: managerUser.id } })
    })
    it('should throw an error if the params was not provided', async () => {
      await expect(AuthService.validateAdmin()).rejects.toThrowError(
        new BadRequest(JSON.stringify({ name: BadRequest.name, description: 'The user is not an admin user' })),
      )
    })

    it('should thrown an error if the user is not MANAGER', async () => {
      await expect(AuthService.validateAdmin(clientAuth)).rejects.toThrowError(
        new BadRequest(JSON.stringify({ name: BadRequest.name, description: 'The user is not an admin user' })),
      )
    })

    it('should return the user if the user is an MANAGER', async () => {
      const result = await AuthService.validateAdmin(managerAuth)

      expect(result).toHaveProperty('email', managerUser.email)
    })
  })
})
