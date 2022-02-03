import { Product, User } from '@prisma/client'
import { plainToClass } from 'class-transformer'
import { BadRequest } from 'http-errors'
import * as faker from 'faker'
import logger from '../../logger'
import { prisma, clearDatabase } from '../../prisma'
import { ProductFactory } from '../../utils/factories/product.factory'
import { UserFactory } from '../../utils/factories/user.factory'
import { AttachmentService } from '../attachments/attachment.service'
import { createProductDto } from './dtos/request/create-product.dto'
import { UpdateProductDto } from './dtos/request/update-product.dto'
import { ProductService } from './products.service'

describe('ProductsService', () => {
  let productFactory: ProductFactory
  let userFactory: UserFactory

  beforeAll(() => {
    productFactory = new ProductFactory(prisma)
    userFactory = new UserFactory(prisma)
  })

  beforeEach(async () => {
    jest.clearAllMocks()
  })

  afterAll(async () => {
    await clearDatabase()
    await prisma.$disconnect()
  })

  describe('createProduct', () => {
    it('should be create a new product', async () => {
      const name = faker.datatype.string()
      const data = await ProductService.createProduct(
        plainToClass(createProductDto, { name, price: 0.0, status: true }),
      )

      expect(data).toHaveProperty('name', name)
    })
  })

  describe('listProducts', () => {
    it('should retrieve the list of products paginated', async () => {
      await productFactory.makeMany(10)

      const data = await ProductService.listProducts({ page: 1, perPage: 5 })

      expect(data.pagination.previousPage).toBeFalsy()
      expect(data.products).toHaveLength(5)
    })
  })

  describe('updateProduct', () => {
    it('should throw an error if the product does not exist', async () => {
      const productUUID = faker.datatype.uuid()

      await expect(
        ProductService.updateProduct(plainToClass(UpdateProductDto, { id: productUUID })),
      ).rejects.toThrowError(new Error('No Product found'))
    })

    it('should update an existing product', async () => {
      const product = await productFactory.make()
      const name = faker.datatype.string()

      const productUpdated = await ProductService.updateProduct(
        plainToClass(UpdateProductDto, { id: product.id, name }),
      )

      expect(productUpdated.name).toBe(name)
    })
  })

  describe('toggleProduct', () => {
    it('should throw an error if the product does not exist', async () => {
      const productUUID = faker.datatype.uuid()
      await expect(ProductService.toogleProduct(productUUID)).rejects.toThrowError(new Error('No Product found'))
    })

    it('should switch the status for the product', async () => {
      const product = await productFactory.make({ status: true })
      const productUpdated = await ProductService.toogleProduct(product.id)

      expect(productUpdated.status).toBeFalsy()
    })
  })

  describe('deleteProduct', () => {
    it('should throw an error if the product does not exist', async () => {
      jest.spyOn(AttachmentService, 'delete').mockImplementation(jest.fn())

      const productUUID = faker.datatype.uuid()
      const spyLogger = jest.spyOn(logger, 'error')

      await expect(ProductService.deleteProduct(productUUID)).rejects.toThrowError()
      expect(spyLogger).toHaveBeenCalledWith('P2025')
    })

    it('should delete the product', async () => {
      jest.spyOn(AttachmentService, 'delete').mockImplementation(jest.fn())

      const product = await productFactory.make()
      const spyPrisma = jest.spyOn(prisma.product, 'delete')
      await ProductService.deleteProduct(product.id)

      expect(spyPrisma).toHaveBeenCalledWith({ where: { id: product.id } })
    })
  })

  describe('addProductToCar', () => {
    let user: User
    let product: Product
    beforeAll(async () => {
      user = await userFactory.make()
      product = await productFactory.make({ status: true })
    })

    it('should throw an error if the user does not exist', async () => {
      const fakeProduct = faker.datatype.uuid()

      await expect(ProductService.addProductToCar(fakeProduct, user.id, 1)).rejects.toThrowError(
        new Error('No Product found'),
      )
    })

    it('should throw an error if the product does not exist', async () => {
      const fakeUser = faker.datatype.uuid()

      await expect(ProductService.addProductToCar(product.id, fakeUser, 1)).rejects.toThrowError(
        new Error('No User found'),
      )
    })

    it('should add the product to a user car', async () => {
      const result = await ProductService.addProductToCar(product.id, user.id, faker.datatype.number({ min: 1 }))

      expect(result).toHaveProperty('carDetail')
    })

    it('should throw an error if the product try to be added twice', async () => {
      await expect(ProductService.addProductToCar(product.id, user.id, 1)).rejects.toThrowError(
        new BadRequest('{"name":"Error","description":"The product already exist into the car"}'),
      )
    })

    it('should throw an error if the product was disabled', async () => {
      const disabledProduct = await productFactory.make({ status: false })

      await expect(ProductService.addProductToCar(disabledProduct.id, user.id, 1)).rejects.toThrowError()
    })
  })

  describe('likeProduct', () => {
    let user: User
    let product: Product
    beforeAll(async () => {
      user = await userFactory.make()
      product = await productFactory.make({ status: true })
    })

    it('should throw an error if the user does not exist', async () => {
      const fakeUser = faker.datatype.uuid()

      await expect(ProductService.likeProduct(product.id, fakeUser)).rejects.toThrowError(new Error('No User found'))
    })

    it('should throw an error if the product does not exist', async () => {
      const fakeProduct = faker.datatype.uuid()

      await expect(ProductService.likeProduct(fakeProduct, user.id)).rejects.toThrowError(new Error('No Product found'))
    })

    it('should like the product', async () => {
      const result = await ProductService.likeProduct(product.id, user.id)
      expect(result).toHaveProperty('liked', true)
    })

    it('should unlike the product', async () => {
      const result = await ProductService.likeProduct(product.id, user.id)
      expect(result).toHaveProperty('liked', false)
    })
  })
})
