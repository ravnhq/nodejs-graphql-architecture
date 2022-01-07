import { plainToClass } from 'class-transformer'
import { GraphQLFieldConfig, GraphQLNonNull, GraphQLString } from 'graphql'
import { UserDto } from '../../services/dtos/response/user.dto'
import { UserService } from '../../services/users.service'
import { UserType } from '../types/user.type'

const currentUser: GraphQLFieldConfig<any, any> = {
  type: UserType,
  args: { userId: { type: new GraphQLNonNull(GraphQLString) } },
  resolve: async function (_source, { userId }) {
    const user = await UserService.findUser(userId)

    return plainToClass(UserDto, user)
  },
}

export const userQueries = {
  currentUser,
}
