import { IntersectionType } from '@nestjs/swagger';

import { PaginationOptionsDto } from '@/common/dtos/pagination-options.dto';
import { CategoryFilterOptionsDto } from './category-filter-options.dto';

export class CategoryQueryParamsDto extends IntersectionType(
  PaginationOptionsDto,
  CategoryFilterOptionsDto,
) {
  constructor(params: CategoryQueryParamsDto) {
    super();
    Object.assign(this, params);
  }
}
