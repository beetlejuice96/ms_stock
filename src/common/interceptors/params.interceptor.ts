import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';

import { CustomRequestInterface } from '../interfaces/custom-request.interface';

@Injectable()
export class ParamsInterceptor implements NestInterceptor {
  async intercept(context: ExecutionContext, next: CallHandler) {
    const request = context.switchToHttp().getRequest<CustomRequestInterface>();
    const { params, property } = request;
    request.property = {
      ...property,
      ...params,
    };
    return next.handle();
  }
}
