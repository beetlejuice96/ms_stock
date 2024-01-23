import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Response } from 'express';
import { AxiosError } from 'axios';

@Catch(AxiosError)
export class AxiosExceptionFilter implements ExceptionFilter {
  catch(exception: AxiosError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    if (exception.response && exception.response.status) {
      const status = exception.response.status;
      const errorData = exception.response.data;
      response
        .status(status)
        .json(errorData);
    } else {
      response
        .status(500)
        .json({
          statusCode: 500,
          error: 'Internal Server Error',
        });
    }
  }
}
