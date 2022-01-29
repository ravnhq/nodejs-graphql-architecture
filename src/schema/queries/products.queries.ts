import { Auth } from '@prisma/client'
import { plainToClass } from 'class-transformer'
import { GraphQLFieldConfig, GraphQLInt, GraphQLNonNull, GraphQLString } from 'graphql'
import { productIdDto } from '../../services/products/dtos/request/toogle-product.dto'
import { ProductService } from '../../services/products/products.service'
import { ProductType } from '../types/product.type'
import { ProductsType } from '../types/products.type'

const listProducts: GraphQLFieldConfig<
  undefined,
  { currentUser: Auth | undefined },
  { page: number; perPage: number }
> = {
  type: ProductsType,
  args: {
    page: { type: new GraphQLNonNull(GraphQLInt) },
    perPage: { type: new GraphQLNonNull(GraphQLInt) },
  },
  resolve: async function (_source, input) {
    return ProductService.listProducts(input)
  },
}

const product: GraphQLFieldConfig<undefined, { currentUser: Auth | undefined }, { productId: string }> = {
  type: ProductType,
  args: {
    productId: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: async function (_source, { productId }) {
    const dto = plainToClass(productIdDto, { productId })
    await dto.isValid()

    return ProductService.getProduct(dto.productId)
  },
}

export const productQueries = {
  listProducts,
  product,
}
