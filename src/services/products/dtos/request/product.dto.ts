import { IsBoolean, IsDecimal, IsOptional, IsString } from 'class-validator'

export class productInput {
  @IsString()
  readonly name: string

  @IsDecimal()
  readonly price: number

  @IsBoolean()
  readonly status: boolean

  @IsOptional()
  readonly attachment?: any
}
