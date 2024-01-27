import { Injectable } from '@nestjs/common';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Mapper, createMap, forMember, mapFrom } from '@automapper/core';

import { ProductEntity } from '../entities/product.entity';
import { ProductResponseDto } from '@/stock/dtos/product-response.dto';
import { ItemEntity } from '@/stock/entities/item.entity';
import { ItemResponseDto } from '@/stock/dtos/item-response.dto';

@Injectable()
export class ItemMapper extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper: Mapper) => {
      createMap(
        mapper,
        ProductEntity,
        ProductResponseDto,
        forMember(
          (productResponse) => productResponse.items,
          mapFrom(({ items }) =>
            items.length > 0
              ? items.map((item) =>
                  this.mapper.map(item, ItemEntity, ItemResponseDto),
                )
              : [],
          ),
        ),
      );
    };
  }
}
