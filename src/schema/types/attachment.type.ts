import { GraphQLObjectType, GraphQLString } from 'graphql'
import { ContentTypeEnum } from './content-type.enum'
import { DateTime } from './date.scalar'
import { ExtTypeEnum } from './ext.type'

export const AttachmentType = new GraphQLObjectType({
  name: 'Attachment',
  description: 'Attachment',
  fields: {
    id: { type: GraphQLString },
    path: { type: GraphQLString },
    key: { type: GraphQLString },
    ext: { type: ExtTypeEnum },
    contentType: { type: ContentTypeEnum },
    signedUrl: { type: GraphQLString },
    createdAt: { type: DateTime },
    updatedAt: { type: DateTime },
  },
})
