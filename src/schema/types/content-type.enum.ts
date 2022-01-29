import { GraphQLEnumType } from 'graphql'

export const ContentTypeEnum = new GraphQLEnumType({
  name: 'ContentType',
  values: {
    PNG: { value: 'image/png' },
    JPG: { value: 'image/jpg' },
    JPEG: { value: 'image/jpeg' },
  },
})
