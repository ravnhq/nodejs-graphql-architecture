import { IsNumber, IsPositive, IsUUID } from 'class-validator'
import { BaseDto } from '../../../common/dtos/base.dto'

export class carItemDto extends BaseDto {
  @IsUUID()
  readonly productId: string

  @IsNumber()
  @IsPositive()
  readonly quantity: number
}
