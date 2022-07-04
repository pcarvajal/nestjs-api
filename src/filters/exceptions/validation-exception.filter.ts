import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  BadRequestException,
} from '@nestjs/common';
import { Request, Response } from 'express';

import { ErrorInterface } from './interfaces/error.interface';

@Catch(BadRequestException)
export class ValidationExceptionFilter implements ExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const message = exception.message;

    const errorResponse: ErrorInterface = {
      code: -1,
      path: request.url,
      timestamp: new Date().toISOString(),
      httpStatus: status,
      message: message,
    };

    response.status(status).json(errorResponse);
  }
}
