import { Exclude, Expose } from "class-transformer"
import { BaseDto } from "../base.dto"

@Exclude()
export class UserDto extends BaseDto {
  @Expose()
  readonly id: string

  @Expose()
  readonly firstName: string

  @Expose()
  readonly lastName: string

  @Expose()
  readonly email: string

  readonly password: string

  @Expose()
  readonly type: string

  @Expose()
  readonly createdAt: Date

  @Expose()
  readonly updatedAt: Date
}
