import { GraphQLBoolean, GraphQLFloat, GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql'
import { DateTime } from './date.scalar'

export const ProductType = new GraphQLObjectType({
  name: 'Product',
  description: 'Product',
  fields: {
    id: { type: new GraphQLNonNull(GraphQLString) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    price: { type: new GraphQLNonNull(GraphQLFloat) },
    status: { type: new GraphQLNonNull(GraphQLBoolean) },
    createdAt: { type: new GraphQLNonNull(DateTime) },
    updatedAt: { type: new GraphQLNonNull(DateTime) },
  },
})
