import { GraphQLEnumType } from 'graphql'

export const ExtTypeEnum = new GraphQLEnumType({
  name: 'ExtType',
  values: {
    PNG: { value: 'png' },
    JPG: { value: 'jpg' },
    JPEG: { value: 'jpeg' },
  },
})
