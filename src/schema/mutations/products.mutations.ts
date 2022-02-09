import { GraphQLFieldConfig, GraphQLNonNull } from 'graphql'
import { ProductService } from '../../services/products/products.service'
import productIdInput from '../types/product-id.input'
import productInput from '../types/product.input'
import { ProductType } from '../types/product.type'
import productUpdateInput from '../types/product.update.input'

const createProduct: GraphQLFieldConfig<string, string> = {
  type: ProductType,
  args: { input: { type: new GraphQLNonNull(productInput) } },
  resolve: async function (_source, { input }) {
    return ProductService.createProduct(input)
  },
}

const updateProduct: GraphQLFieldConfig<string, string> = {
  type: ProductType,
  args: { input: { type: new GraphQLNonNull(productUpdateInput) } },
  resolve: async function (_source, { input }) {
    return ProductService.updateProduct(input)
  },
}

const toogleProduct: GraphQLFieldConfig<string, string> = {
  type: ProductType,
  args: { input: { type: new GraphQLNonNull(productIdInput) } },
  resolve: async function (_source, { input }) {
    return ProductService.toogleProduct(input.id)
  },
}

const deleteProduct: GraphQLFieldConfig<string, string> = {
  type: ProductType,
  args: { input: { type: new GraphQLNonNull(productIdInput) } },
  resolve: async function (_source, { input }: { input: { id: string } }) {
    return ProductService.deleteProduct(input.id)
  },
}
export const productMutations = {
  createProduct,
  updateProduct,
  toogleProduct,
  deleteProduct,
}
