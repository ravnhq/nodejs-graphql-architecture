import {
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
} from "graphql"

export const PaginationType = new GraphQLObjectType({
  name: "Pagination",
  description: "Pagination items",
  fields: {
    currentPage: { type: new GraphQLNonNull(GraphQLInt) },
    itemsPerPage: { type: new GraphQLNonNull(GraphQLInt) },
    totalItems: { type: new GraphQLNonNull(GraphQLInt) },
    totalPages: { type: new GraphQLNonNull(GraphQLInt) },
    previousPage: { type: GraphQLInt },
    nextPage: { type: GraphQLInt },
  },
})
