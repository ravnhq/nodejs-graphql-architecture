import { GraphQLSchema, printSchema } from "graphql"
import QueryType from "./queries"
import logger from "../logger"

const schema = new GraphQLSchema({
  query: QueryType,
})

logger.info(printSchema(schema))

export default schema
