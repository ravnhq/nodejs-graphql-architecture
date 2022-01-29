import { IsUUID } from 'class-validator'
import { BaseDto } from '../../../common/dtos/base.dto'

export class productIdDto extends BaseDto {
  @IsUUID()
  readonly productId: string
}
