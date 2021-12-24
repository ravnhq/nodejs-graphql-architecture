import { User } from "@prisma/client"
import { prisma } from "../server"
export class UserService {
  static async findUser(userId: string): Promise<User> {
    return prisma.user.findUnique({
      where: { id: userId },
      rejectOnNotFound: true,
    })
  }
}
