import { PrismaClient, TypeUser } from '@prisma/client'
import { hashSync } from 'bcrypt'

export default async (prisma: PrismaClient) => {
  const password = hashSync('welcome123', 10)
  const result = []
  result.push(
    await prisma.user.upsert({
      create: {
        email: 'eduardomanrique@ravn.co',
        type: TypeUser.MANAGER,
        firstName: 'eduardo',
        lastName: 'de rivero',
        password,
      },
      update: {},
      where: { email: 'eduardomanrique@ravn.co' },
    }),
  )
  return result
}
