import { Prisma, PrismaClient } from '@prisma/client'
import * as faker from 'faker'
import { Optional } from 'utility-types'
import { AbstractFactory } from './abstract.factory'

type ProductInput = Partial<Prisma.ProductCreateInput>

type ProductType = Optional<
  Prisma.ProductGetPayload<{
    include: {
      attachment: true
    }
  }>,
  'attachmentId'
>

export class ProductFactory extends AbstractFactory<ProductType> {
  constructor(protected readonly prismaClient: PrismaClient) {
    super()
  }
  async make(input: ProductInput = {}): Promise<ProductType> {
    return this.prismaClient.product.create({
      data: {
        ...input,
        price: input.price ?? faker.datatype.float(),
        status: input.status ?? faker.datatype.boolean(),
        name: input.name ?? faker.datatype.string(),
        detail: {
          create: { quantity: faker.datatype.number(), total: faker.datatype.float() },
        },
      },
      include: {
        attachment: true,
      },
    })
  }
  async makeMany(factorial: number, input: ProductInput = {}): Promise<ProductType[]> {
    return Promise.all([...Array(factorial)].map(() => this.make(input)))
  }
}
