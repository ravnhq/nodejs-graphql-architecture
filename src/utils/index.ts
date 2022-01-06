import { PaginationArgs } from "./dtos/request/pagination.args"
import { PaginationDto } from "./dtos/response/pagination.dto"
import { IPaginationArgs } from "./interfaces"

export const SkipAndTake = ({
  perPage,
  page,
}: PaginationArgs): IPaginationArgs => {
  return { perPage, skip: (page - 1) * perPage }
}

export const getPagination = (
  { perPage, page }: PaginationArgs,
  totalItems: number,
): PaginationDto => {
  if (!totalItems) {
    return {
      currentPage: 0,
      itemsPerPage: 0,
      totalItems: 0,
      totalPages: 0,
      previousPage: 0,
      nextPage: 0,
    }
  }

  const totalPages = Math.ceil(totalItems / perPage)
  const nextPage = page < totalPages ? page + 1 : null
  const previousPage = page > 1 && page <= totalPages ? page - 1 : null

  return {
    currentPage: page,
    itemsPerPage: perPage,
    totalItems,
    totalPages,
    previousPage,
    nextPage,
  }
}
