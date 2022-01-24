import { GraphQLInputObjectType, GraphQLString, GraphQLNonNull, GraphQLBoolean, GraphQLFloat } from 'graphql'

export default new GraphQLInputObjectType({
  name: 'productUpdateInput',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLString) },
    name: { type: GraphQLString },
    price: { type: GraphQLFloat },
    status: { type: GraphQLBoolean },
  }),
})
