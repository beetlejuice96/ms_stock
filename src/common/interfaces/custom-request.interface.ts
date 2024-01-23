import { Request } from 'express';

export interface CustomRequestInterface<TProperty = any> extends Request {
  property: TProperty;
}
