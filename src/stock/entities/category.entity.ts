import { Entity, Column, OneToMany } from 'typeorm';
import { AutoMap } from '@automapper/classes';

import { ProductEntity } from './product.entity';
import { BaseEntity } from '@/common/entities/base.entity';

@Entity('stk_categories')
export class CategoryEntity extends BaseEntity {
  @AutoMap()
  @Column({ length: 150 })
  name: string;

  @AutoMap()
  @OneToMany(() => ProductEntity, (product) => product.categoryId, {
    eager: true,
  })
  products: ProductEntity[];

  constructor(params: CategoryEntity) {
    const childParams: Omit<CategoryEntity, keyof BaseEntity> = {
      ...params,
    };
    super({
      id: params?.id,
      createdAt: params?.createdAt,
      updatedAt: params?.updatedAt,
      deletedAt: params?.deletedAt,
    });
    Object.assign(this, childParams);
  }
}
