import { GraphQLInputObjectType, GraphQLString, GraphQLNonNull, GraphQLInt } from 'graphql'

export default new GraphQLInputObjectType({
  name: 'carItemInput',
  fields: () => ({
    productId: { type: new GraphQLNonNull(GraphQLString) },
    quantity: { type: new GraphQLNonNull(GraphQLInt) },
  }),
})
