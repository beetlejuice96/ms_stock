import { Entity, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { AutoMap } from '@automapper/classes';

import { BaseEntity } from '@/common/entities/base.entity';
import { ItemEntity } from './item.entity';
import { ORDER_STATUS } from '../enums/order-status.enum';
import { ProductEntity } from './product.entity';

@Entity({ name: 'stk_orders' })
export class OrderEntity extends BaseEntity {
  @AutoMap()
  @Column({ name: 'customer_name' })
  customerName: string;

  @AutoMap()
  @Column({ name: 'total_price' })
  totalPrice: number;

  @AutoMap()
  @Column()
  quantity!: number;

  @AutoMap()
  @ManyToOne(() => ProductEntity)
  @JoinColumn({ name: 'product_id' })
  productId!: number;

  @AutoMap()
  @Column({ name: 'order_status', type: 'enum', enum: ORDER_STATUS })
  status: ORDER_STATUS;

  @AutoMap()
  @OneToMany(() => ItemEntity, (item) => item.orderId, {
    eager: true,
  })
  items: ItemEntity[];

  constructor(params: OrderEntity) {
    const childParams: Omit<OrderEntity, keyof BaseEntity> = {
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
