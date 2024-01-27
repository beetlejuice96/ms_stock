import { Injectable } from '@nestjs/common';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Mapper, createMap, forMember, mapFrom } from '@automapper/core';
import { CategoryEntity } from '../entities/category.entity';
import { CategoryResponseDto } from '../dtos/category-response.dto';
import { ProductEntity } from '../entities/product.entity';
import { ProductResponseDto } from '@/stock/dtos/product-response.dto';

@Injectable()
export class CategoryMapper extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper: Mapper) => {
      createMap(
        mapper,
        CategoryEntity,
        CategoryResponseDto,
        forMember(
          (categoryResponse) => categoryResponse.products,
          mapFrom(({ products }) =>
            products.length > 0
              ? products.map((product) =>
                  this.mapper.map(product, ProductEntity, ProductResponseDto),
                )
              : [],
          ),
        ),
      );
    };
  }
}
