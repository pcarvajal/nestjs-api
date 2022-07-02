import { GenericResponse } from './generic-response';

export interface PagedResponse<T> extends GenericResponse<T> {
  pageNumber?: number;
  pageRecords?: number;
  totalPages?: number;
  totalRecords?: number;
}
