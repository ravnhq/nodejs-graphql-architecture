import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql"
import { DateTime } from "./date.scalar"
import { UserTypeEnum } from "./user.enum"

export const UserType = new GraphQLObjectType({
  name: "User",
  description: "User with his data",
  fields: {
    id: { type: new GraphQLNonNull(GraphQLString) },
    firstName: { type: new GraphQLNonNull(GraphQLString) },
    lastName: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: new GraphQLNonNull(GraphQLString) },
    type: { type: new GraphQLNonNull(UserTypeEnum) },
    createdAt: { type: new GraphQLNonNull(DateTime) },
    updatedAt: { type: new GraphQLNonNull(DateTime) },
  },
})
