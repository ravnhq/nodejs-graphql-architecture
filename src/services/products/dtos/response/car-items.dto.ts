import { Exclude, Expose } from 'class-transformer'
import { ProductDto } from './product.dto'

@Exclude()
class CarItemsDto {
  @Expose()
  readonly product: ProductDto
}

@Exclude()
export class CarDto {
  @Exclude()
  readonly id: string

  @Expose()
  readonly carDetail: CarItemsDto[]
}
