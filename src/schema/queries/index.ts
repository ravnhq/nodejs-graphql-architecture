import { GraphQLObjectType } from "graphql"
import { productQueries } from "./products.queries"
import { userQueries } from "./user.queries"

export default new GraphQLObjectType({
  name: "Query",
  fields: {
    ...userQueries,
    ...productQueries,
  },
})
