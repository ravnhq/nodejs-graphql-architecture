import { User } from '@prisma/client'
import { prisma } from '../prisma'
export class UserService {
  static async findUser(userId: string): Promise<User> {
    return prisma.user.findUnique({
      where: { id: userId },
      rejectOnNotFound: true,
    })
  }
}
