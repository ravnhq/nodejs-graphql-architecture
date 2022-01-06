import { Exclude, Expose } from "class-transformer"
import { CollectionDto } from "../../../utils/dtos/response/collection.dto"
import { BaseDto } from "../base.dto"
import { ProductDto } from "./product.dto"

@Exclude()
export class ProductsDto extends CollectionDto {
  readonly products: ProductDto[]
}
