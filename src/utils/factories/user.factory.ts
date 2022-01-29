import { Prisma, PrismaClient, TypeUser, User } from '@prisma/client'
import * as faker from 'faker'
import { AbstractFactory } from './abstract.factory'

type UserInput = Partial<Prisma.UserCreateInput>

export class UserFactory extends AbstractFactory<User> {
  constructor(protected readonly prismaClient: PrismaClient) {
    super()
  }
  async make(input: UserInput = {}): Promise<User> {
    return this.prismaClient.user.create({
      data: {
        ...input,
        firstName: input.firstName ?? faker.name.firstName(),
        email: input.email ?? faker.internet.email(),
        lastName: input.lastName ?? faker.name.lastName(),
        password: input.password ?? faker.lorem.word(),
        type: input.type ?? faker.random.arrayElement(Object.values(TypeUser)),
      },
    })
  }
  async makeMany(factorial: number, input: UserInput = {}): Promise<User[]> {
    return Promise.all([...Array(factorial)].map(() => this.make(input)))
  }
}
