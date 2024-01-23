import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { CustomRequestInterface } from '../interfaces/custom-request.interface';

export const Property = createParamDecorator(
  (key: keyof CustomRequestInterface, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<CustomRequestInterface>();
    const { property } = request;
    return key ? property[key] : property;
  },
);
