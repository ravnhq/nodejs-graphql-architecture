import { GraphQLBoolean, GraphQLNonNull, GraphQLObjectType } from 'graphql'
import { ProductType } from './product.type'

export const LikedProductType = new GraphQLObjectType({
  name: 'LikedProduct',
  description: 'Product liked or disliked for the current user',
  fields: {
    liked: { type: new GraphQLNonNull(GraphQLBoolean) },
    product: { type: new GraphQLNonNull(ProductType) },
  },
})
