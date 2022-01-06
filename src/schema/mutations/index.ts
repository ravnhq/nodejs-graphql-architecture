import { GraphQLObjectType, GraphQLNonNull, GraphQLID } from "graphql"
import { productMutations } from "./products.mutations"

export default new GraphQLObjectType({
  name: "Mutation",
  fields: () => ({
    ...productMutations,
  }),
})
