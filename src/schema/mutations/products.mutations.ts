import { GraphQLFieldConfig, GraphQLNonNull } from 'graphql'
import { ProductService } from '../../services/products.service'
import productInput from '../types/product.input'
import { ProductType } from '../types/product.type'

const createProduct: GraphQLFieldConfig<any, any> = {
  type: ProductType,
  args: { input: { type: new GraphQLNonNull(productInput) } },
  resolve: async function (_source, { input }) {
    const product = await ProductService.createProduct(input)

    return product
  },
}

export const productMutations = {
  createProduct,
}
