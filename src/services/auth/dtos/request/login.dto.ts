import { IsEmail, Matches } from 'class-validator'

export class LoginDto {
  @IsEmail()
  readonly email: string
  @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/)
  readonly password: string
}
