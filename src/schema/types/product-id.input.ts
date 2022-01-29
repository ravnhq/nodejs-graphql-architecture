import { GraphQLInputObjectType, GraphQLString, GraphQLNonNull } from 'graphql'

export default new GraphQLInputObjectType({
  name: 'productIdInput',
  fields: () => ({
    productId: { type: new GraphQLNonNull(GraphQLString) },
  }),
})
