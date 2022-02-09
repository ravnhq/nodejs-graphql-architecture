import { IsBoolean, IsDecimal, IsOptional, IsString, IsUUID } from 'class-validator'

export class UpdateProductDto {
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
