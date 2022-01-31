import { TypeUser, User } from '@prisma/client'
import faker from 'faker'
import { NotFound } from 'http-errors'
import { clearDatabase, prisma } from '../../prisma'
import { ProductFactory } from '../../utils/factories/product.factory'
import { UserFactory } from '../../utils/factories/user.factory'
import { UserService } from './users.service'

describe('AuthService', () => {
  let userFactory: UserFactory
  let productFactory: ProductFactory

  beforeAll(() => {
    userFactory = new UserFactory(prisma)
    productFactory = new ProductFactory(prisma)
  })

  beforeEach(async () => {
    jest.clearAllMocks()
  })

  afterAll(async () => {
    await clearDatabase()
    await prisma.$disconnect()
  })

  describe('findUser', () => {
    let user: User
    beforeAll(async () => {
      user = await userFactory.make()
    })
    it('should throw an error if the user was not exist', async () => {
      await expect(UserService.findUser(faker.datatype.uuid())).rejects.toThrowError(new Error('No User found'))
    })

    it('should return the user', async () => {
      const result = await UserService.findUser(user.id)
      expect(result).toHaveProperty('email', user.email)
    })
  })

  describe('buyOrder', () => {
    let user: User
    beforeAll(async () => {
      user = await userFactory.make({ type: TypeUser.CLIENT })
    })
    it('should throw an error if the user does not exist', async () => {
      await expect(UserService.buyOrder(faker.datatype.uuid())).rejects.toThrowError(new Error('No User found'))
    })

    it('should throw an error if the user has an empty car', async () => {
      await expect(UserService.buyOrder(user.id)).rejects.toThrowError(
        new NotFound(JSON.stringify({ name: NotFound.name, description: 'The user has no items in his car' })),
      )
    })

    it('should create the order with the items added into the user shopping car', async () => {
      const spyPrisma = jest.spyOn(prisma.carDetail, 'deleteMany')
      const product = await productFactory.make()

      const userCar = await prisma.car.create({
        data: {
          userId: user.id,
          carDetail: { create: { quantity: 5, productId: product.id } },
        },
      })

      const order = await UserService.buyOrder(user.id)

      expect(spyPrisma).toBeCalledWith({ where: { carId: userCar.id } })
      expect(order).toBeTruthy()
    })
  })
})
