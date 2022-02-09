import { GraphQLSchema, printSchema } from 'graphql'
import logger from '../logger'
import Query from './queries'
import Mutation from './mutations'

const schema = new GraphQLSchema({
  query: Query,
  mutation: Mutation,
})

process.env.NODE_ENV === 'production' ? null : logger.info(printSchema(schema))

export default schema
