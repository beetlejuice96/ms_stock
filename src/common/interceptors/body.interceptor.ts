import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';

import { CustomRequestInterface } from '../interfaces/custom-request.interface';

@Injectable()
export class BodyInterceptor implements NestInterceptor {
  async intercept(context: ExecutionContext, next: CallHandler) {
    const request = context.switchToHttp().getRequest<CustomRequestInterface>();
    const { body, property } = request;
    request.property = {
      ...property,
      ...body,
    };
    return next.handle();
  }
}
