import { Injectable, NestMiddleware } from '@nestjs/common';
import { Response, NextFunction } from 'express';
import { CustomRequestInterface } from '../interfaces/custom-request.interface';

@Injectable()
export class CustomRequestPropertiesMiddleware implements NestMiddleware {
  use(req: CustomRequestInterface, res: Response, next: NextFunction) {
    req.property = {};
    next();
  }
}
