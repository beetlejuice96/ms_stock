import { PartialType } from '@nestjs/swagger';

import { ProductBodyDto } from './product-body.dto';

export class ProductBodyUpdateDto extends PartialType(ProductBodyDto) {
  constructor(params: ProductBodyUpdateDto) {
    super();
    Object.assign(this, params);
  }
}
