import { IntersectionType } from '@nestjs/swagger';

import { PaginationOptionsDto } from '@/common/dtos/pagination-options.dto';
import { ProductFilterOptionsDto } from '@/stock/dtos/product-filter-options.dto';

export class ProductQueryParamsDto extends IntersectionType(
  PaginationOptionsDto,
  ProductFilterOptionsDto,
) {
  constructor(params: ProductQueryParamsDto) {
    super();
    Object.assign(this, params);
  }
}
