import { Exclude, Expose } from 'class-transformer'
import { AttachmentDto } from '../../../attachments/dtos/respose/attachment.dto'

@Exclude()
export class ProductDto {
  @Expose()
  readonly id: string

  @Expose()
  readonly name: string

  @Expose()
  readonly price: number

  @Expose()
  readonly status: boolean

  @Expose()
  readonly createdAt: Date

  @Expose()
  readonly updatedAt: Date

  @Expose()
  readonly attachment?: AttachmentDto
}
