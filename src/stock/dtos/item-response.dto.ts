import {
  MapperOmitType,
  MapperIntersectionType,
} from '@automapper/classes/mapped-types';

import { BaseResponseDto } from '@/common/dtos/base-response.dto';
import { ItemEntity } from '@/stock/entities/item.entity';

export class ItemResponseDto extends MapperIntersectionType(
  MapperOmitType(ItemEntity, ['id', 'createdAt', 'updatedAt', 'deletedAt']),
  BaseResponseDto,
) {
  constructor(params: ItemResponseDto) {
    super();
    Object.assign(this, params);
  }
}
