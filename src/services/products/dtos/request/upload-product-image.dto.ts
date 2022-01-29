import { ContentTypeEnum, FileExtensionEnum } from '../../../attachments/enums/attachment.enum'

export class UploadProductImageDto {
  readonly productId: string
  readonly contentType: ContentTypeEnum
  readonly ext: FileExtensionEnum
  readonly filename: string
}
