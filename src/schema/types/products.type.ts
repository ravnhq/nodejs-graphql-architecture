import { GraphQLList, GraphQLNonNull, GraphQLObjectType } from "graphql"
import { PaginationType } from "./pagination.type"

import { ProductType } from "./product.type"

export const ProductsType = new GraphQLObjectType({
  name: "Products",
  description: "List of products paginated",
  fields: {
    products: { type: new GraphQLList(ProductType) },
    pagination: { type: new GraphQLNonNull(PaginationType) },
  },
})
