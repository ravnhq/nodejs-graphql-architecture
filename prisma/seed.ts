import { PrismaClient } from '@prisma/client'
import logger from '../src/logger'
import { adminSeed } from './seeds'

const prisma = new PrismaClient()

async function main() {
  await Promise.all([adminSeed(prisma)])
}

main()
  .catch((e) => {
    logger.error(e)
    process.exit(1)
  })
  .finally(async () => await prisma.$disconnect())
