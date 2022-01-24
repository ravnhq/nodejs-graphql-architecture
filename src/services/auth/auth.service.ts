import ms from 'ms'
import { Unauthorized } from 'http-errors'
import { plainToClass } from 'class-transformer'
import { sign } from 'jsonwebtoken'
import { compareSync } from 'bcrypt'
import { prisma } from '../../prisma'
import { JWTPayloadType } from '../../utils/types'
import { UserWithAccessTokenDto } from './dtos/response/user-token.dto'
import { LoginDto } from './dtos/request/login.dto'
export class AuthService {
  static async login(data: LoginDto) {
    const expirationTime = new Date()
    const refreshExpirationTime = new Date()
    const expiresAt = ms(process.env.JWT_EXP ?? '')
    const refreshExpiresAt = ms(process.env.JWT_EXP_REFRESH ?? '')

    expirationTime.setMilliseconds(expirationTime.getMilliseconds() + expiresAt)
    refreshExpirationTime.setMilliseconds(refreshExpirationTime.getMilliseconds() + refreshExpiresAt)

    const user = await prisma.user.findUnique({
      where: { email: data.email },
    })

    if (!compareSync(data.password, user.password)) {
      throw new Unauthorized('The credentials are incorrect')
    }

    const auth = await prisma.auth.create({
      data: {
        userId: user.id,
      },
    })

    return plainToClass(UserWithAccessTokenDto, {
      accessToken: this.generateJWT({ jti: auth.jti, aud: auth.aud }),
      refreshToken: this.generateJWT({
        jti: auth.refreshToken,
        secret: process.env.JWT_REFRESH_TOKEN_SECRET,
        expiresIn: process.env.JWT_EXP_REFRESH,
      }),
      user,
      expiresAt: expirationTime,
      refreshExpiresAt: refreshExpirationTime,
    })
  }

  static generateJWT(args: JWTPayloadType) {
    return sign(
      {
        jti: args.jti,
        aud: args.aud,
      },
      args.secret ?? process.env.JWT_SECRET ?? '',
      {
        expiresIn: args.expiresIn ?? process.env.JWT_EXP,
      },
    )
  }
}
