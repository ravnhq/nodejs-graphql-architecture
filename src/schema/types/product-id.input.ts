import { GraphQLInputObjectType, GraphQLString, GraphQLNonNull } from 'graphql'

export default new GraphQLInputObjectType({
  name: 'productIdInput',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLString) },
  }),
})
