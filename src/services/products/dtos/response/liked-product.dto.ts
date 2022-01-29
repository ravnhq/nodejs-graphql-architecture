import { Exclude, Expose } from 'class-transformer'
import { ProductDto } from './product.dto'

@Exclude()
export class LikedProductDto {
  @Expose()
  readonly liked: boolean

  @Expose()
  readonly product: ProductDto
}
