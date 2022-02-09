import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql'
import { UserType } from './user.type'

export const LoginType = new GraphQLObjectType({
  name: 'Login',
  description: 'User with his data for access with credentials',
  fields: {
    user: { type: new GraphQLNonNull(UserType) },
    accessToken: { type: new GraphQLNonNull(GraphQLString) },
    refreshToken: { type: new GraphQLNonNull(GraphQLString) },
  },
})
