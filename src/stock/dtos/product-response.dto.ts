import {
  MapperOmitType,
  MapperIntersectionType,
} from '@automapper/classes/mapped-types';

import { BaseResponseDto } from '@/common/dtos/base-response.dto';
import { ProductEntity } from '../entities/product.entity';

export class ProductResponseDto extends MapperIntersectionType(
  MapperOmitType(ProductEntity, ['id', 'createdAt', 'updatedAt', 'deletedAt']),
  BaseResponseDto,
) {
  constructor(params: ProductResponseDto) {
    super();
    Object.assign(this, params);
  }
}
