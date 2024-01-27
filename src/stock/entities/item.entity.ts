import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { AutoMap } from '@automapper/classes';

import { BaseEntity } from '@/common/entities/base.entity';
import { OrderEntity } from './order.entity';
import { ProductEntity } from './product.entity';

@Entity('stk_items')
export class ItemEntity extends BaseEntity {
  @AutoMap()
  @Column()
  name: string;

  @AutoMap()
  @Column({ name: 'purchase_price' })
  purchasePrice: number;

  @AutoMap()
  @Column({ name: 'is_available' })
  isAvailable: boolean;

  @AutoMap()
  @ManyToOne(() => OrderEntity, { nullable: true })
  @JoinColumn({ name: 'order_id' })
  orderId?: number;

  @AutoMap()
  @ManyToOne(() => ProductEntity, { nullable: false })
  @JoinColumn({ name: 'product_id' })
  productId!: number;

  constructor(params: ItemEntity) {
    const childParams: Omit<ItemEntity, keyof BaseEntity> = {
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
