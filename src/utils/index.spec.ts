import { getPagination, SkipAndTake } from '.'

describe('utils', () => {
  describe('SkipAndTake', () => {
    it('should return skip 0 if the page is the first', () => {
      const result = SkipAndTake({ page: 1, perPage: 10 })

      expect(result).toHaveProperty('skip', 0)
    })

    it('should return the same value perPage', () => {
      const result = SkipAndTake({ page: 1, perPage: 10 })

      expect(result).toHaveProperty('perPage', 10)
    })

    it('should return the number of items skipped depend on the (page-1) * perPage', () => {
      const result = SkipAndTake({ page: 2, perPage: 5 })

      expect(result).toHaveProperty('skip', 5)
    })
  })
  describe('getPagination', () => {
    it('should return all the values with 0 if no totalItems was passed', () => {
      const result = getPagination({ perPage: 10, page: 1 }, 0)

      expect(result.currentPage).toBe(0)
      expect(result.itemsPerPage).toBe(0)
      expect(result.nextPage).toBe(0)
      expect(result.previousPage).toBe(0)
      expect(result.totalItems).toBe(0)
      expect(result.totalPages).toBe(0)
    })

    it('should return the pagination info', () => {
      const result = getPagination({ perPage: 10, page: 1 }, 50)

      expect(result.currentPage).toBe(1)
      expect(result.itemsPerPage).toBe(10)
      expect(result.nextPage).toBe(2)
      expect(result.previousPage).toBe(null)
      expect(result.totalItems).toBe(50)
      expect(result.totalPages).toBe(5)
    })
  })
})
