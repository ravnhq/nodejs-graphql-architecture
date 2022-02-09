import { Exclude, Expose } from 'class-transformer'

@Exclude()
export class ProductDto {
  @Expose()
  readonly id: string

  @Expose()
  readonly name: string

  @Expose()
  readonly price: number

  @Expose()
  readonly status: boolean

  @Expose()
  readonly attachment?: string

  @Expose()
  readonly createdAt: Date

  @Expose()
  readonly updatedAt: Date
}
