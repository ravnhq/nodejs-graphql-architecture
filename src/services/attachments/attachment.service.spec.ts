import faker from 'faker'
import { NotFound } from 'http-errors'
import { clearDatabase, prisma } from '../../prisma'
import { ProductFactory } from '../../utils/factories/product.factory'
import { s3MockService } from '../common/mocks/default.mock'
import { AttachmentService } from './attachment.service'
import { ContentTypeEnum, FileExtensionEnum, ParentEnum } from './enums/attachment.enum'

jest.mock('aws-sdk', () => {
  return { config: { update: jest.fn() }, S3: jest.fn(() => s3MockService()) }
})

describe('AttachmentService', () => {
  let productFactory: ProductFactory

  beforeAll(() => {
    productFactory = new ProductFactory(prisma)
  })
  beforeEach(async () => {
    jest.clearAllMocks()
  })

  afterAll(async () => {
    await clearDatabase()
    await prisma.$disconnect()
  })

  describe('create', () => {
    it('should create an attachment', async () => {
      const product = await productFactory.make()

      const attachment = await AttachmentService.create({
        productId: product.id,
        ext: FileExtensionEnum.PNG,
        contentType: ContentTypeEnum.PNG,
        filename: faker.random.alphaNumeric(10),
        parentType: ParentEnum.PRODUCT,
      })

      expect(attachment).toBeDefined()
      expect(attachment.id).toBeTruthy()
      expect(attachment.signedUrl).toBeTruthy()
    })
  })

  describe('getSignedUrl', () => {
    it('should return the link for the attachment', async () => {
      expect(AttachmentService.getSignedUrl(faker.random.alphaNumeric(8))).toBeTruthy()
    })
  })

  describe('delete', () => {
    it('should throw an error if the product does not have an attachment', async () => {
      const product = await productFactory.make()

      await expect(AttachmentService.delete(product.id)).rejects.toThrowError(
        new NotFound('The task does not have an attachment'),
      )
    })

    it('should delete the attachment and remove from the bucket', async () => {
      const product = await productFactory.make({
        attachment: { create: { contentType: ContentTypeEnum.PNG, ext: FileExtensionEnum.PNG, key: '', path: '' } },
      })
      const spyPrisma = jest.spyOn(prisma.attachment, 'delete')
      await AttachmentService.delete(product.id)

      expect(spyPrisma).toBeCalledWith({ where: { productId: product.id } })
    })
  })
})
