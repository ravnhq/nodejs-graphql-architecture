import { Exclude, Expose } from 'class-transformer'
import { detailOrderDto } from './detail-order.dto'

@Exclude()
export class userOrderDto {
  @Expose()
  readonly id: string

  @Expose()
  readonly detail: detailOrderDto[]

  @Expose()
  readonly createdAt: Date

  @Expose()
  readonly updatedAt: Date
}
