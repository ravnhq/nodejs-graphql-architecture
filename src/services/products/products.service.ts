import { Prisma } from '@prisma/client'
import { plainToClass, plainToInstance } from 'class-transformer'
import logger from '../../logger'
import { prisma } from '../../prisma'
import { getPagination, SkipAndTake } from '../../utils'
import { productInput } from './dtos/request/product.dto'
import { UpdateProductDto } from './dtos/request/update-product.dto'
import { ProductDto } from './dtos/response/product.dto'
import { ProductsDto } from './dtos/response/products.dto'

export class ProductService {
  static async createProduct(data: productInput): Promise<ProductDto> {
    const newProduct = await prisma.product.create({
      data,
    })

    return plainToClass(ProductDto, newProduct)
  }

  static async listProducts({ page, perPage }: { page: number; perPage: number }): Promise<ProductsDto> {
    const { skip } = SkipAndTake({ page, perPage })

    const [count, products] = await Promise.all([
      prisma.product.count(),
      prisma.product.findMany({ skip, take: perPage }),
    ])
    const productsClass = plainToInstance(ProductDto, products)
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
}
