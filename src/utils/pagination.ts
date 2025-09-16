export interface PaginationData {
  currentPage: number
  totalPages: number
  totalItems: number
  hasNext: boolean
  hasPrev: boolean
}

export interface PaginatedResult<T> {
  items: T[]
  pagination: PaginationData
}

export interface PaginatedPageConfig<T> {
  title: string
  description: string
  basePath: string
  getPaginatedData: (page: number, pageSize: number) => PaginatedResult<T>
}

/**
 * Next.js의 generateStaticParams에서 사용할 페이지네이션 파라미터들을 생성합니다.
 * @template T - 페이지네이션 대상 데이터의 타입
 * @param getPaginatedData - 페이지네이션된 데이터를 반환하는 함수
 * @param pageSize - 페이지당 항목 수 (기본값: 10)
 * @returns Next.js generateStaticParams에서 사용할 파라미터 배열
 */
export function generatePaginatedParams<T>(
  getPaginatedData: (page: number, pageSize: number) => any,
  pageSize: number = 10
) {
  const result = getPaginatedData(1, pageSize)
  const totalPages = result.pagination.totalPages
  const pages = Array.from({ length: totalPages }, (_, i) => ({
    page: (i + 1).toString(),
  }))
  return [{ page: undefined }, ...pages]
}

/**
 * Next.js의 searchParams에서 현재 페이지 번호를 안전하게 추출합니다.
 * @param searchParams - Next.js page에서 받는 searchParams 객체
 * @returns 유효한 페이지 번호 (최소값: 1)
 */
export function getCurrentPageFromSearchParams(searchParams: {
  page?: string
}): number {
  return parseInt(searchParams.page || '1', 10)
}
