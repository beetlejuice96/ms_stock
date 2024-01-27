import {
  MapperOmitType,
  MapperIntersectionType,
} from '@automapper/classes/mapped-types';

import { BaseResponseDto } from '@/common/dtos/base-response.dto';
import { CategoryEntity } from '../entities/category.entity';

export class CategoryResponseDto extends MapperIntersectionType(
  MapperOmitType(CategoryEntity, ['id', 'createdAt', 'updatedAt', 'deletedAt']),
  BaseResponseDto,
) {
  // here we can add some custom properties

  constructor(params: CategoryResponseDto) {
    super();
    Object.assign(this, params);
  }
}
