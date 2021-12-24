import { plainToClass } from "class-transformer"
import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql"
import { UserDto } from "../dtos/response/user.dto"
import { UserService } from "../services/users.service"
import { UserType } from "./types/user.type"

export default new GraphQLObjectType({
  name: "Query",
  fields: {
    currentUser: {
      type: UserType,
      args: { userId: { type: new GraphQLNonNull(GraphQLString) } },
      resolve: async function (_source, { userId }) {
        const user = await UserService.findUser(userId)
        return plainToClass(UserDto, user)
      },
    },
  },
})
