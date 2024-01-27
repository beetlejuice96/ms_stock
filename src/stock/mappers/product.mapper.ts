import { Injectable } from '@nestjs/common';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Mapper, createMap, forMember, mapFrom } from '@automapper/core';

import { ProductEntity } from '../entities/product.entity';

@Injectable()
export class ProductMapper extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  // override get profile() {
  // return (mapper: Mapper) => {
  //   createMap(
  //     mapper,
  //     ProductEntity,
  //     ProductResponseDto,
  //     forMember(
  //       (categoryResponse) => categoryResponse.products,
  //       mapFrom(({ products }) =>
  //         products.length > 0
  //           ? products.map((product) =>
  //               this.mapper.map(product, ProductEntity, ProductResponseDto),
  //             )
  //           : [],
  //       ),
  //     ),
  //   );
  // };
  // }
}
