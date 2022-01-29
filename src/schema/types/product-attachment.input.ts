import { GraphQLInputObjectType, GraphQLNonNull, GraphQLString } from 'graphql'
import { ContentTypeEnum } from './content-type.enum'
import { ExtTypeEnum } from './ext.type'

export default new GraphQLInputObjectType({
  name: 'productAttachmentInput',
  fields: {
    productId: { type: new GraphQLNonNull(GraphQLString) },
    contentType: { type: new GraphQLNonNull(ContentTypeEnum) },
    ext: { type: new GraphQLNonNull(ExtTypeEnum) },
    filename: { type: new GraphQLNonNull(GraphQLString) },
  },
})
