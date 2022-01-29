import 'reflect-metadata'
import { graphqlHTTP } from 'express-graphql'
import express, { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'
import cors from 'cors'
import { HttpError } from 'http-errors'
import { Auth } from '@prisma/client'
import logger from './logger'
import schema from './schema'
import { prisma } from './prisma'

const app = express()
const PORT = process.env.PORT ?? 3000
const ENVIROMENT = process.env.NODE_ENV ?? 'development'

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cors())

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function errorHandler(err: HttpError, _req: Request, res: Response, _next: NextFunction): void {
  if (ENVIROMENT !== 'development') {
    logger.error(err.message)
    logger.error(err.stack || '')
  }

  res.status(err.status ?? 500)
  res.json(err)
}

app.use((req: Request, _res: Response, next: NextFunction) => {
  logger.info(
    /(graphql)+/g.test(req.url)
      ? {
          headers: req.headers,
          url: req.url,
        }
      : {
          params: req.params,
          body: req.body,
          headers: req.headers,
          url: req.url,
        },
    `${req.method} ${req.url}`,
  )
  next()
})

app.get('/api/v1/status', (_req: Request, res: Response) => {
  res.json({ time: new Date() })
})

app.use('/graphql', async (req: Request, res: Response) => {
  let currentUser: Auth | undefined | null
  try {
    const authToken =
      req && req.headers && req.headers.authorization
        ? verify(req.headers.authorization.split(' ')[1], process.env.JWT_SECRET ?? '') // "Bearer "
        : null

    if (authToken && typeof authToken !== 'string') {
      currentUser = await prisma.auth.findFirst({
        where: { jti: authToken.jti },
        rejectOnNotFound: false,
      })
    }

    if (authToken && !currentUser) {
      return res.status(401).send({
        errors: [{ message: 'Invalid access token' }],
      })
    }
  } catch (error) {
    return res.status(401).send({
      errors: [{ message: 'Invalid access token' }],
    })
  }

  graphqlHTTP({
    schema,
    graphiql: { headerEditorEnabled: true },
    context: { currentUser },
    customFormatErrorFn: (error) => {
      try {
        const data: { name: string; description?: string | [string] } = JSON.parse(error.message)

        const errorReport = {
          message: data.name,
          description: data.description,
          locations: error.locations,
          stack: error.stack ? error.stack.split('\n') : [],
          path: error.path,
        }
        logger.error(errorReport)

        return errorReport
      } catch (e) {
        logger.error(e)
        const errorReport = {
          message: error.name,
          locations: error.locations,
          stack: error.stack ? error.stack.split('\n') : [],
          path: error.path,
        }
        logger.error(errorReport)
        return errorReport
      }
    },
  })(req, res)
})

app.use(errorHandler)

app.listen(PORT, async () => {
  logger.info(`Server listening on port %d, env: %s`, PORT, ENVIROMENT)
})
