import { plainToClass } from 'class-transformer'
import { GraphQLFieldConfig } from 'graphql'
import { UserDto } from '../../services/users/dtos/response/user.dto'
import { UserService } from '../../services/users/users.service'
import { UserType } from '../types/user.type'

const currentUser: GraphQLFieldConfig<any, any> = {
  type: UserType,
  resolve: async function (_source, _input, { currentUser }) {
    const user = await UserService.findUser(currentUser.userId)

    return plainToClass(UserDto, user)
  },
}

export const userQueries = {
  currentUser,
}
