import * as faker from 'faker'
import { prisma, clearDatabase } from '../prisma'
import { ProductFactory } from '../utils/factories/product.factory'
import { ProductService } from './products.service'

describe('ProductsService', () => {
  let productFactory: ProductFactory
  beforeAll(() => {
    productFactory = new ProductFactory(prisma)
  })

  describe('createProduct', () => {
    it('should be create a new product', async () => {
      const name = faker.datatype.string()
      const data = await ProductService.createProduct({ name, price: 0.0, status: true })

      expect(data).toHaveProperty('name', name)
    })
  })

  describe('listProducts', () => {
    beforeAll(() => {
      productFactory.makeMany(10)
    })

    it('should retrieve the list of products paginated', async () => {
      const data = await ProductService.listProducts({ page: 1, perPage: 5 })

      expect(data.pagination.nextPage).toBeTruthy()
      expect(data.pagination.previousPage).toBeFalsy()
      expect(data.products).toHaveLength(5)
    })
  })
  afterAll(() => {
    prisma.$disconnect()
    clearDatabase()
  })
})
