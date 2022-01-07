import { Product } from '@prisma/client'
import { plainToClass } from 'class-transformer'
import { prisma } from '../server'
import { getPagination, SkipAndTake } from '../utils'
import { productInput } from './dtos/request/product.input'
import { ProductDto } from './dtos/response/product.dto'
import { ProductsDto } from './dtos/response/products.dto'

export class ProductService {
  static async createProduct(product: productInput): Promise<Product> {
    const data = plainToClass(ProductDto, product)

    const newProduct = await prisma.product.create({
      data,
    })

    return newProduct
  }

  static async listProducts({ page, perPage }: { page: number; perPage: number }): Promise<ProductsDto> {
    const { skip } = SkipAndTake({ page, perPage })

    const [count, products] = await Promise.all([
      prisma.product.count(),
      prisma.product.findMany({ skip, take: perPage }),
    ])

    return {
      products,
      pagination: getPagination({ page, perPage }, count),
    }
  }
}
