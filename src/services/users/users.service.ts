import { User } from '@prisma/client'
import { plainToClass } from 'class-transformer'
import { NotFound, UnprocessableEntity } from 'http-errors'
import { prisma } from '../../prisma'
import { userOrderDto } from './dtos/response/user-order.dto'
export class UserService {
  static async findUser(userId: string): Promise<User> {
    return prisma.user.findUnique({
      where: { id: userId },
      rejectOnNotFound: true,
    })
  }

  static async buyOrder(userId: string) {
    const user = await prisma.user.findUnique({ where: { id: userId } })
    const userCar = await prisma.car.findFirst({
      where: { userId: user.id },
      rejectOnNotFound: false,
      include: { carDetail: { include: { product: true } } },
    })

    if (!userCar) {
      throw new NotFound(JSON.stringify({ name: NotFound.name, description: 'The user has no items in his car' }))
    }

    try {
      const newOrder = await prisma.order.create({ data: { userId: user.id } })

      await Promise.all(
        userCar.carDetail.map(async (item) => {
          await prisma.detail.create({
            data: {
              quantity: item.quantity,
              total: item.quantity * item.product.price,
              orderId: newOrder.id,
              productId: item.productId,
            },
          })
        }),
      )

      await prisma.carDetail.deleteMany({ where: { carId: userCar.id } })

      const userOrder = await prisma.order.findUnique({
        where: { id: newOrder.id },
        include: { detail: { include: { product: true } } },
      })

      return plainToClass(userOrderDto, userOrder)
    } catch (error) {
      throw new UnprocessableEntity(
        JSON.stringify({
          name: UnprocessableEntity.name,
          description: 'Something went wrong when the order was created',
        }),
      )
    }
  }
}
