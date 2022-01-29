import { GraphQLFloat, GraphQLInt, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql'
import { DateTime } from './date.scalar'
import { ProductType } from './product.type'

const DetailOrderType = new GraphQLObjectType({
  name: 'OrderDetail',
  description: 'Detail for the new order created',
  fields: {
    id: { type: new GraphQLNonNull(GraphQLString) },
    quantity: { type: new GraphQLNonNull(GraphQLInt) },
    total: { type: new GraphQLNonNull(GraphQLFloat) },
    product: { type: new GraphQLNonNull(ProductType) },
    createdAt: { type: new GraphQLNonNull(DateTime) },
    updatedAt: { type: new GraphQLNonNull(DateTime) },
  },
})

export const OrderType = new GraphQLObjectType({
  name: 'Order',
  description: 'A new order created',
  fields: {
    id: { type: new GraphQLNonNull(GraphQLString) },
    detail: { type: new GraphQLList(DetailOrderType) },
    createdAt: { type: new GraphQLNonNull(DateTime) },
    updatedAt: { type: new GraphQLNonNull(DateTime) },
  },
})
