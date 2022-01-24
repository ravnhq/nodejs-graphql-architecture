import { Product } from '@prisma/client'
import * as faker from 'faker'
import logger from '../../logger'
import { prisma, clearDatabase } from '../../prisma'
import { ProductFactory } from '../../utils/factories/product.factory'
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
    beforeAll(async () => {
      await productFactory.makeMany(10)
    })

    it('should retrieve the list of products paginated', async () => {
      const data = await ProductService.listProducts({ page: 1, perPage: 5 })

      expect(data.pagination.nextPage).toBeTruthy()
      expect(data.pagination.previousPage).toBeFalsy()
      expect(data.products).toHaveLength(5)
    })
  })

  describe('updateProduct', () => {
    let product: Product
    beforeAll(async () => {
      product = await productFactory.make()
    })

    it('should throw an error if the product does not exist', async () => {
      const productUUID = faker.datatype.uuid()
      await expect(ProductService.updateProduct({ id: productUUID })).rejects.toThrowError(
        new Error('No Product found'),
      )
    })

    it('should update an existing product', async () => {
      const name = faker.datatype.string()
      const productUpdated = await ProductService.updateProduct({ id: product.id, name })

      expect(productUpdated.name).toBe(name)
    })
  })

  describe('toggleProduct', () => {
    let product: Product
    beforeAll(async () => {
      product = await productFactory.make({ status: true })
    })

    it('should throw an error if the product does not exist', async () => {
      const productUUID = faker.datatype.uuid()
      await expect(ProductService.toogleProduct(productUUID)).rejects.toThrowError(new Error('No Product found'))
    })

    it('should switch the status for the product', async () => {
      const productUpdated = await ProductService.toogleProduct(product.id)

      expect(productUpdated.status).toBeFalsy()
    })
  })

  describe('deleteProduct', () => {
    let product: Product
    beforeAll(async () => {
      product = await productFactory.make({ detail: {} })
    })

    it('should throw an error if the product does not exist', async () => {
      const productUUID = faker.datatype.uuid()
      const spyLogger = jest.spyOn(logger, 'error')

      await expect(ProductService.deleteProduct(productUUID)).rejects.toThrowError()
      expect(spyLogger).toHaveBeenCalledWith('P2025')
    })

    it('should delete the product', async () => {
      const spyPrisma = jest.spyOn(prisma.product, 'delete')
      await ProductService.deleteProduct(product.id)

      expect(spyPrisma).toHaveBeenCalledWith({ where: { id: product.id } })
    })
  })

  beforeEach(() => {
    jest.clearAllMocks()
  })
  afterAll(() => {
    prisma.$disconnect()
    clearDatabase()
  })
})
