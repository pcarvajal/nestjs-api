import { GenericResponse } from '../commons/responses/generic-response';
import { ErrorResponse } from '../commons/responses/error-response';
import { PagedResponse } from '../commons/responses/paged-response';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ResponseHelper<T> {
  successResponse(
    data: T,
    code: number,
    description: string,
  ): GenericResponse<T> {
    return {
      code: code,
      description: description,
      data: T,
    };
  }

  successPagedResponse(
    data: T,
    code: number,
    description: string,
    pageNumber: number,
    pageRecords: number,
    totalPages: number,
    totalRecords: number,
  ): PagedResponse<T> {
    return {
      code: code,
      description: description,
      pageNumber: pageNumber,
      pageRecords: pageRecords,
      totalPages: totalPages,
      totalRecords: totalRecords,
    };
  }

  errorResponse(error: any, code: number, description: string): ErrorResponse {
    let errorMessage;

    if (error instanceof Error) {
      errorMessage = error.message;
    } else if (typeof error === 'string') {
      errorMessage = error;
    } else {
      errorMessage = error;
    }

    return {
      code: code,
      error: description,
      description: errorMessage,
    };
  }
}
