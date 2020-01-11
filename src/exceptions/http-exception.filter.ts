import { ExceptionFilter, Catch, ArgumentsHost, HttpException, Logger } from '@nestjs/common';
import { Request, Response } from 'express';

import { HttpHeaders } from '../utils/net';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    const errorData = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      request: {
        method: request.method,
        query: request.query,
        body: request.body,
      },
      path: request.url,
    };
    Logger.error(`[HttpExceptionFilter] ERROR ${JSON.stringify(errorData)}`);
    response.setHeader(HttpHeaders.CONTENT_TYPE, 'application/json');
    response.status(status).json(errorData);
  }
}
