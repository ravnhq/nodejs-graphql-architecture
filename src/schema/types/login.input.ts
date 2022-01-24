import { GraphQLInputObjectType, GraphQLString, GraphQLNonNull } from 'graphql'

export default new GraphQLInputObjectType({
  name: 'loginInput',
  fields: () => ({
    email: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
  }),
})
