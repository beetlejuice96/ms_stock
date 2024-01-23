import { IntersectionType } from '@nestjs/swagger';

import { PaginationOptionsDto } from '@/common/dtos/pagination-options.dto';
import { UserFilterOptionsDto } from './user-filter-options.dto';

export class UserQueryParamsDto extends IntersectionType(
  PaginationOptionsDto,
  UserFilterOptionsDto,
) {
  constructor(params: UserFilterOptionsDto) {
    super();
    Object.assign(this, params);
  }
}
