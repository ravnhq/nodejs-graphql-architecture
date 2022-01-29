import { IsBoolean, IsDecimal, IsOptional, IsString } from 'class-validator'
import { BaseDto } from '../../../common/dtos/base.dto'

export class createProductDto extends BaseDto {
  @IsString()
  readonly name: string

  @IsDecimal()
  readonly price: number

  @IsBoolean()
  readonly status: boolean

  @IsOptional()
  readonly attachment?: any
}
