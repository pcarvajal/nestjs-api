export interface PagedResponse<T> {
  code: number;
  description: string;
  pageNumber?: number;
  pageRecords?: number;
  totalPages?: number;
  totalRecords?: number;
  results: T;
}
