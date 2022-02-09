import { GraphQLFieldConfig, GraphQLInt, GraphQLNonNull } from 'graphql'
import { ProductService } from '../../services/products/products.service'
import { ProductsType } from '../types/products.type'

const listProducts: GraphQLFieldConfig<any, any> = {
  type: ProductsType,
  args: {
    page: { type: new GraphQLNonNull(GraphQLInt) },
    perPage: { type: new GraphQLNonNull(GraphQLInt) },
  },
  resolve: async function (_source, args) {
    return ProductService.listProducts(args)
  },
}

export const productQueries = {
  listProducts,
}
