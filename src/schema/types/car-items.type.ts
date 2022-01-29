import { GraphQLList, GraphQLNonNull, GraphQLObjectType } from 'graphql'
import { ProductType } from './product.type'

const CarDetailType = new GraphQLObjectType({
  name: 'CarDetail',
  description: 'Detail for the car',
  fields: {
    product: { type: new GraphQLNonNull(ProductType) },
  },
})

export const CarType = new GraphQLObjectType({
  name: 'CarItems',
  description: 'Items for the car',
  fields: {
    carDetail: { type: new GraphQLList(CarDetailType) },
  },
})
