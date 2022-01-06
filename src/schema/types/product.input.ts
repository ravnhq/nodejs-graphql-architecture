import {
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLBoolean,
  GraphQLFloat,
} from "graphql"

export default new GraphQLInputObjectType({
  name: "productInput",
  fields: () => ({
    name: { type: new GraphQLNonNull(GraphQLString) },
    price: { type: new GraphQLNonNull(GraphQLFloat) },
    status: { type: GraphQLBoolean },
  }),
})
