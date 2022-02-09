import { Prisma, PrismaClient, Product } from '@prisma/client'
import * as faker from 'faker'
import { AbstractFactory } from './abstract.factory'

type ProductInput = Partial<Prisma.ProductCreateInput>

export class ProductFactory extends AbstractFactory<Product> {
  constructor(protected readonly prismaClient: PrismaClient) {
    super()
  }
  async make(input: ProductInput = {}): Promise<Product> {
    return this.prismaClient.product.create({
      data: {
        ...input,
        price: input.price ?? faker.datatype.float(),
        status: input.status ?? faker.datatype.boolean(),
        name: input.name ?? faker.datatype.string(),
        detail: input.detail ?? {
          create: { quantity: faker.datatype.number(), total: faker.datatype.float() },
        },
      },
    })
  }
  async makeMany(factorial: number, input: ProductInput = {}): Promise<Product[]> {
    return Promise.all([...Array(factorial)].map(() => this.make(input)))
  }
}
