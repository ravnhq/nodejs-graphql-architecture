import { ProductService } from './products.service'

describe('ProductsService', () => {
  describe('createProduct', () => {
    it('should be create a new Product', async () => {
      const data = await ProductService.createProduct({ name: '', price: 0.0, status: true })
      expect(data).toBeDefined()
    })
  })
})
