import { Exclude, Expose, Transform } from 'class-transformer'

@Exclude()
export class JwtTokenDto {
  @Expose()
  readonly accessToken: string

  @Expose()
  readonly refreshToken: string

  @Expose()
  @Transform(({ value }) => value.getTime())
  readonly refreshExpiresAt: Date
}
