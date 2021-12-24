import { isISO8601 } from "class-validator"
import { GraphQLScalarType } from "graphql"

export const DateTime = new GraphQLScalarType({
  name: "DateTime",
  description:
    "A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format.",
  serialize: (value) => {
    if (value instanceof Date) {
      const valueAsString = value.toISOString()
      if (isISO8601(valueAsString)) {
        return valueAsString
      }
    }
  },
  parseValue: (value) => {
    if (value instanceof Date) {
      if (isISO8601(value)) {
        return new Date(value)
      }
      throw new Error(
        "parseISO8601: DateTime cannot represent an invalid ISO-8601 Date string",
      )
    }
  },
})
