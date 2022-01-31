import faker from 'faker'
import { clearDatabase, prisma } from '../../prisma'
import { s3MockService } from '../common/mocks/default.mock'
import { AttachmentService } from './attachment.service'
import { ContentTypeEnum, FileExtensionEnum, ParentEnum } from './enums/attachment.enum'

jest.mock('aws-sdk', () => {
  return { config: { update: jest.fn() }, S3: jest.fn(() => s3MockService()) }
})

describe('AttachmentService', () => {
  beforeEach(async () => {
    jest.clearAllMocks()
  })

  afterAll(async () => {
    await clearDatabase()
    await prisma.$disconnect()
  })

  describe('create', () => {
    it('should create an attachment', async () => {
      const attachment = await AttachmentService.create({
        id: faker.datatype.uuid(),
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
})
