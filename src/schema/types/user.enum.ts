import { GraphQLEnumType } from "graphql"

export const UserTypeEnum = new GraphQLEnumType({
  name: "UserType",
  values: {
    MANAGER: { value: "MANAGER" },
    CLIENT: { value: "CLIENT" },
  },
})
