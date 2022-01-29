import { ContentTypeEnum, FileExtensionEnum, ParentEnum } from '../../enums/attachment.enum'

export class CreateAttachmentDto {
  readonly id: string
  readonly contentType: ContentTypeEnum
  readonly ext: FileExtensionEnum
  readonly parentType: ParentEnum
  readonly filename: string
}
