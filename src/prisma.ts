import { PrismaClient } from '@prisma/client'
import createHttpError from 'http-errors'
import * as pluralize from 'pluralize'
import snakeCase from 'lodash.snakecase'

export const prisma = new PrismaClient({
  rejectOnNotFound: (error) => new createHttpError.NotFound(error.message),
})

export function clearDatabase() {
  const models = Reflect.ownKeys(prisma).filter((key: any) => key[0] !== '_')

  return Promise.all(
    models.map(async (modelKey) => {
      if (typeof modelKey === 'string') {
        await prisma.$executeRawUnsafe(`TRUNCATE TABLE test.${pluralize.plural(snakeCase(modelKey))} CASCADE;`)
      }
    }),
  )
}
