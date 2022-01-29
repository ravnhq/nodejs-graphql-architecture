import { Auth } from '@prisma/client'
import { plainToClass } from 'class-transformer'
import { GraphQLFieldConfig, GraphQLNonNull } from 'graphql'
import { AuthService } from '../../services/auth/auth.service'
import { LoginDto } from '../../services/auth/dtos/request/login.dto'
import { UserService } from '../../services/users/users.service'
import loginInput from '../types/login.input'
import { LoginType } from '../types/login.type'
import { OrderType } from '../types/order.type'

const login: GraphQLFieldConfig<undefined, { currentUser: Auth | undefined }, { input: LoginDto }> = {
  type: LoginType,
  args: { input: { type: new GraphQLNonNull(loginInput) } },
  resolve: async function (_source, { input }) {
    const dto = plainToClass(LoginDto, input)
    await dto.isValid()
    return AuthService.login(dto)
  },
}

const buyOrder: GraphQLFieldConfig<undefined, { currentUser: Auth | undefined }, undefined> = {
  type: OrderType,
  args: {},
  resolve: async function (_source, _args, { currentUser }) {
    return UserService.buyOrder(currentUser?.userId ?? '')
  },
}

export const userMutations = {
  login,
  buyOrder,
}
