import { nanoid } from 'nanoid'
import { plainToClass } from 'class-transformer'
import { NotFound, UnprocessableEntity } from 'http-errors'
import { s3 } from '../../s3'
import { prisma } from '../../prisma'
import { CreateAttachmentDto } from './dtos/request/create-attachment.dto'
import { AttachmentDirectoryEnum } from './enums/attachment.enum'
import { AttachmentDto } from './dtos/respose/attachment.dto'

export class AttachmentService {
  static async create(input: CreateAttachmentDto) {
    const path = AttachmentDirectoryEnum[input.parentType].replace('{uuid}', input.productId)

    const attachment = await prisma.attachment.create({
      data: {
        contentType: input.contentType,
        key: `${nanoid()}-${input.filename}`,
        ext: input.ext,
        path,
        productId: input.productId,
      },
    })

    const signedUrl = s3.getSignedUrl('putObject', {
      Key: `${path}/${attachment.key}.${attachment.ext}`,
      ContentType: attachment.contentType,
      Bucket: process.env.AWS_BUCKET,
      Expires: +(process.env.AWS_PRESIGNED_EXPIRES_IN ?? 0),
    })

    return plainToClass(AttachmentDto, { signedUrl, ...attachment })
  }

  static async getSignedUrl(path: string) {
    return s3.getSignedUrl('getObject', {
      Key: path,
      Bucket: process.env.AWS_BUCKET,
      Expires: +(process.env.AWS_PRESIGNED_EXPIRES_IN ?? 0),
    })
  }

  static async delete(productId: string): Promise<void> {
    const attachment = await prisma.attachment.findUnique({
      where: { productId },
      rejectOnNotFound: false,
    })

    if (!attachment) {
      throw new NotFound('The task does not have an attachment')
    }

    s3.deleteObject(
      {
        Bucket: process.env.AWS_BUCKET ?? '',
        Key: `${attachment.path}/${attachment.key}.${attachment.ext}`,
      },
      (err) => {
        if (err) {
          throw new UnprocessableEntity(err?.message)
        }
      },
    )

    try {
      await prisma.attachment.delete({ where: { productId } })
    } catch (error) {
      throw new NotFound("Couldn't find Attachment")
    }
  }
}
