import { GraphQLSchema, printSchema } from 'graphql'
import Query from './queries'
import Mutation from './mutations'
import logger from '../logger'

const schema = new GraphQLSchema({
  query: Query,
  mutation: Mutation,
})

logger.info(printSchema(schema))

export default schema
