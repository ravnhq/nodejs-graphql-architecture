import { Prisma } from '@prisma/client'
import { plainToClass, plainToInstance } from 'class-transformer'
import { BadRequest } from 'http-errors'
import logger from '../../logger'
import { prisma } from '../../prisma'
import { getPagination, SkipAndTake } from '../../utils'
import { AttachmentService } from '../attachments/attachment.service'
import { AttachmentDto } from '../attachments/dtos/respose/attachment.dto'
import { ParentEnum } from '../attachments/enums/attachment.enum'
import { createProductDto } from './dtos/request/create-product.dto'
import { UpdateProductDto } from './dtos/request/update-product.dto'
import { UploadProductImageDto } from './dtos/request/upload-product-image.dto'
import { CarDto } from './dtos/response/car-items.dto'
import { LikedProductDto } from './dtos/response/liked-product.dto'
import { ProductDto } from './dtos/response/product.dto'
import { ProductsDto } from './dtos/response/products.dto'

export class ProductService {
  static async createProduct(data: createProductDto): Promise<ProductDto> {
    const newProduct = await prisma.product.create({
      data,
    })

    return plainToClass(ProductDto, newProduct)
  }

  static async listProducts({ page, perPage }: { page: number; perPage: number }): Promise<ProductsDto> {
    const { skip } = SkipAndTake({ page, perPage })

    const [count, products] = await Promise.all([
      prisma.product.count({ where: { status: true } }),
      prisma.product.findMany({ skip, take: perPage, where: { status: true }, include: { attachment: true } }),
    ])

    const productWithSignedUrl = products.map((product) => ({
      ...product,
      attachment: {
        ...product.attachment,
        signedUrl: product.attachment
          ? AttachmentService.getSignedUrl(
              `${product.attachment?.path}/${product.attachment?.key}.${product.attachment?.ext}`,
            )
          : undefined,
      },
    }))

    const productsClass = plainToInstance(ProductDto, productWithSignedUrl)

    return {
      products: productsClass,
      pagination: getPagination({ page, perPage }, count),
    }
  }

  static async updateProduct({ id, ...data }: UpdateProductDto): Promise<ProductDto> {
    await prisma.product.findUnique({ where: { id } })

    try {
      const product = await prisma.product.update({ data, where: { id } })

      return plainToClass(ProductDto, product)
    } catch (error: unknown) {
      logger.error(error)
      throw new Error('An error occurred when the product was updating')
    }
  }

  static async toogleProduct(id: string): Promise<ProductDto> {
    const { status } = await prisma.product.findUnique({ where: { id }, select: { status: true } })

    try {
      const product = await prisma.product.update({ data: { status: !status }, where: { id } })

      return plainToClass(ProductDto, product)
    } catch (error) {
      logger.error(error)
      throw new Error('An error occurred when the product was updating')
    }
  }

  static async deleteProduct(id: string): Promise<ProductDto> {
    try {
      const product = await prisma.product.delete({ where: { id } })

      return plainToClass(ProductDto, product)
    } catch (error: unknown) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        logger.error(error.code)
      }
      throw new Error('The Product does not exist')
    }
  }

  static async addProductToCar(productId: string, userId: string, quantity: number): Promise<CarDto | undefined> {
    const product = await prisma.product.findFirst({ where: { id: productId, status: true }, rejectOnNotFound: true })
    const user = await prisma.user.findUnique({ where: { id: userId } })

    let car = await prisma.car.findUnique({ where: { userId: user.id }, rejectOnNotFound: false })
    if (!car) {
      car = await prisma.car.create({ data: { userId: user.id } })
    }

    try {
      await prisma.carDetail.create({ data: { productId: product.id, carId: car.id, quantity } })

      const carItems = await prisma.car.findUnique({
        where: { userId: user.id },
        include: { carDetail: { include: { product: true } } },
      })

      return plainToClass(CarDto, carItems)
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new BadRequest(
          JSON.stringify({ name: error.name, description: 'The product already exist into the car' }),
        )
      }
    }
  }

  static async likeProduct(productId: string, userId: string): Promise<LikedProductDto> {
    const product = await prisma.product.findFirst({ where: { id: productId, status: true }, rejectOnNotFound: true })
    const user = await prisma.user.findUnique({ where: { id: userId } })

    const productLiked = await prisma.likedProduct.findFirst({
      where: { productId: product.id, userId: user.id },
      rejectOnNotFound: false,
    })

    let productUpdated
    if (!productLiked) {
      productUpdated = await prisma.likedProduct.create({
        data: { productId: product.id, userId: user.id, liked: true },
        include: { product: true },
      })
    } else {
      productUpdated = await prisma.likedProduct.update({
        data: { liked: !productLiked.liked },
        where: { userId_productId: { productId: product.id, userId: user.id } },
        include: { product: true },
      })
    }

    return plainToClass(LikedProductDto, productUpdated)
  }

  static async uploadProductImage({
    productId,
    contentType,
    ext,
    filename,
  }: UploadProductImageDto): Promise<AttachmentDto> {
    const product = await prisma.product.findFirst({
      where: { id: productId, status: true },
      select: { id: true },
      rejectOnNotFound: true,
    })

    const attachment = await AttachmentService.create({
      contentType,
      ext,
      filename,
      parentType: ParentEnum.PRODUCT,
      id: product.id,
    })

    await prisma.product.update({ data: { attachment: { connect: { id: attachment.id } } }, where: { id: product.id } })

    return plainToClass(AttachmentDto, attachment)
  }

  static async getProduct(productId: string) {
    const product = await prisma.product.findFirst({
      where: { id: productId, status: true },
      include: { attachment: true },
      rejectOnNotFound: true,
    })

    return plainToClass(ProductDto, {
      ...product,
      attachment: {
        ...product.attachment,
        signedUrl: AttachmentService.getSignedUrl(
          `${product.attachment?.path}/${product.attachment?.key}.${product.attachment?.ext}`,
        ),
      },
    })
  }
}
