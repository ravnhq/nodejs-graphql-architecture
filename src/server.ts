import "reflect-metadata"
import { graphqlHTTP } from "express-graphql"
import express, { NextFunction, Request, Response } from "express"
import cors from "cors"
import createHttpError, { HttpError } from "http-errors"
import { PrismaClient } from "@prisma/client"
import logger from "./logger"
import schema from "./schema"

export const prisma = new PrismaClient({
  rejectOnNotFound: (error) => new createHttpError.NotFound(error.message),
})

const app = express()
const PORT = process.env.PORT ?? 3000
const ENVIROMENT = process.env.NODE_ENV ?? "development"

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cors())

function errorHandler(
  err: HttpError,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void {
  if (ENVIROMENT !== "development") {
    logger.error(err.message)
    logger.error(err.stack || "")
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

app.get("/api/v1/status", (_req: Request, res: Response) => {
  res.json({ time: new Date() })
})

app.use("/graphql", (req: Request, res: Response) => {
  graphqlHTTP({
    schema,
    graphiql: true,
    context: {},
    customFormatErrorFn: (err) => {
      const errorReport = {
        message: err.message,
        locations: err.locations,
        stack: err.stack ? err.stack.split("\n") : [],
        path: err.path,
      }
      logger.error(errorReport)
      return errorReport
    },
  })(req, res)
})

app.use(errorHandler)

app.listen(PORT, async () => {
  logger.info(`Server listening on port %d, env: %s`, PORT, ENVIROMENT)
})
