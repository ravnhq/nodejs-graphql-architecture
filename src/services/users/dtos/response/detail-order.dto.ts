import { Exclude, Expose } from 'class-transformer'
import { ProductDto } from '../../../products/dtos/response/product.dto'

@Exclude()
export class detailOrderDto {
  @Expose()
  readonly id: string

  @Expose()
  readonly quantity: number

  @Expose()
  readonly total: number

  @Expose()
  readonly product: ProductDto

  @Expose()
  readonly createdAt: Date

  @Expose()
  readonly updatedAt: Date
}
