import { Auth } from '@prisma/client'
import { plainToClass } from 'class-transformer'
import { GraphQLFieldConfig, GraphQLNonNull } from 'graphql'
import { AuthService } from '../../services/auth/auth.service'
import { productIdDto } from '../../services/products/dtos/request/toogle-product.dto'
import { UpdateProductDto } from '../../services/products/dtos/request/update-product.dto'
import { ProductService } from '../../services/products/products.service'
import { AttachmentType } from '../types/attachment.type'
import { CarType } from '../types/car-items.type'
import productAttachmentInput from '../types/product-attachment.input'
import { LikedProductType } from '../types/liked-product.type'
import productIdInput from '../types/product-id.input'
import productInput from '../types/product.input'
import { ProductType } from '../types/product.type'
import productUpdateInput from '../types/product.update.input'
import { UploadProductImageDto } from '../../services/products/dtos/request/upload-product-image.dto'
import carItemInput from '../types/car-item.input'
import { carItemDto } from '../../services/products/dtos/request/car-item.dto'

const createProduct: GraphQLFieldConfig<undefined, { currentUser: Auth | undefined }> = {
  type: ProductType,
  args: { input: { type: new GraphQLNonNull(productInput) } },
  resolve: async function (_source, { input }, { currentUser }) {
    await AuthService.validateAdmin(currentUser)

    return ProductService.createProduct(input)
  },
}

const updateProduct: GraphQLFieldConfig<undefined, { currentUser: Auth | undefined }, { input: UpdateProductDto }> = {
  type: ProductType,
  args: { input: { type: new GraphQLNonNull(productUpdateInput) } },
  resolve: async function (_source, { input }) {
    const dto = plainToClass(UpdateProductDto, input)
    await dto.isValid()

    return ProductService.updateProduct(dto)
  },
}

const toogleProduct: GraphQLFieldConfig<undefined, { currentUser: Auth | undefined }, { input: productIdDto }> = {
  type: ProductType,
  args: { input: { type: new GraphQLNonNull(productIdInput) } },
  resolve: async function (_source, { input }, { currentUser }) {
    await AuthService.validateAdmin(currentUser)

    const dto = plainToClass(productIdDto, input)
    await dto.isValid()

    return ProductService.toogleProduct(dto.productId)
  },
}

const deleteProduct: GraphQLFieldConfig<undefined, { currentUser: Auth | undefined }, { input: productIdDto }> = {
  type: ProductType,
  args: { input: { type: new GraphQLNonNull(productIdInput) } },
  resolve: async function (_source, { input }, { currentUser }) {
    await AuthService.validateAdmin(currentUser)

    const dto = plainToClass(productIdDto, input)
    await dto.isValid()

    return ProductService.deleteProduct(dto.productId)
  },
}

const addProductToCar: GraphQLFieldConfig<undefined, { currentUser: Auth | undefined }, { input: carItemDto }> = {
  type: CarType,
  args: { input: { type: new GraphQLNonNull(carItemInput) } },
  resolve: async function (_source, { input }, { currentUser }) {
    const user = await AuthService.validateAdmin(currentUser)

    const dto = plainToClass(carItemDto, input)
    await dto.isValid()

    return ProductService.addProductToCar(dto.productId, user.id, dto.quantity)
  },
}

const likeProduct: GraphQLFieldConfig<undefined, { currentUser: Auth | undefined }, { input: productIdDto }> = {
  type: LikedProductType,
  args: { input: { type: new GraphQLNonNull(productIdInput) } },
  resolve: async function (_source, { input }, { currentUser }) {
    const user = await AuthService.validateAdmin(currentUser)

    const dto = plainToClass(productIdDto, input)
    await dto.isValid()

    return ProductService.likeProduct(dto.productId, user.id)
  },
}

const uploadProductImage: GraphQLFieldConfig<
  undefined,
  { currentUser: Auth | undefined },
  { input: UploadProductImageDto }
> = {
  type: AttachmentType,
  args: { input: { type: new GraphQLNonNull(productAttachmentInput) } },
  resolve: async function (_source, { input }, { currentUser }) {
    await AuthService.validateAdmin(currentUser)

    return ProductService.uploadProductImage(input)
  },
}

export const productMutations = {
  createProduct,
  updateProduct,
  toogleProduct,
  deleteProduct,
  addProductToCar,
  likeProduct,
  uploadProductImage,
}
