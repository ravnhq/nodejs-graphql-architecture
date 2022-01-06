import { Decimal } from "@prisma/client/runtime"
import { Exclude, Expose } from "class-transformer"
import { BaseDto } from "../base.dto"

@Exclude()
export class ProductDto {
  @Expose()
  readonly id: string

  @Expose()
  readonly name: string

  @Expose()
  readonly price: Decimal

  @Expose()
  readonly status: boolean

  @Expose()
  readonly attachment?: string

  @Expose()
  readonly createdAt: Date

  @Expose()
  readonly updatedAt: Date
}
