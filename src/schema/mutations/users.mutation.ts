import { GraphQLFieldConfig, GraphQLNonNull } from 'graphql'
import { AuthService } from '../../services/auth/auth.service'
import loginInput from '../types/login.input'
import { LoginType } from '../types/login.type'

const login: GraphQLFieldConfig<string, string> = {
  type: LoginType,
  args: { input: { type: new GraphQLNonNull(loginInput) } },
  resolve: async function (_source, { input }) {
    return AuthService.login(input)
  },
}

export const userMutations = {
  login,
}
