import { IsBoolean, IsDecimal, IsOptional, IsString, IsUUID } from 'class-validator'
import { BaseDto } from '../../../common/dtos/base.dto'

export class UpdateProductDto extends BaseDto {
  @IsUUID()
  readonly id: string

  @IsOptional()
  @IsString()
  readonly name?: string

  @IsOptional()
  @IsDecimal()
  readonly price?: number

  @IsOptional()
  @IsBoolean()
  readonly status?: boolean

  @IsOptional()
  @IsUUID()
  readonly attachmentId?: string
}
