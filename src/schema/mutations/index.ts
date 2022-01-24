import { GraphQLObjectType } from 'graphql'
import { productMutations } from './products.mutations'
import { userMutations } from './users.mutation'

export default new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    ...productMutations,
    ...userMutations,
  }),
})
