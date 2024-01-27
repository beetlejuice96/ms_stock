import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { AutoMap } from '@automapper/classes';

import { BaseEntity } from '@/common/entities/base.entity';
import { CategoryEntity } from './category.entity';
import { OrderEntity } from './order.entity';
import { ItemEntity } from './item.entity';

@Entity('stk_products')
export class ProductEntity extends BaseEntity {
  @AutoMap()
  @Column({ length: 150 })
  readonly name!: string;

  @AutoMap()
  @ManyToOne(() => CategoryEntity)
  @JoinColumn({ name: 'category_id' })
  readonly categoryId!: CategoryEntity | number;

  @AutoMap()
  @OneToMany(() => OrderEntity, (order) => order.productId)
  orders: OrderEntity[];

  @AutoMap()
  @OneToMany(() => ItemEntity, (item) => item.productId, {
    eager: true,
  })
  items: ItemEntity[];

  constructor(params: ProductEntity) {
    const childParams: Omit<ProductEntity, keyof BaseEntity> = {
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
