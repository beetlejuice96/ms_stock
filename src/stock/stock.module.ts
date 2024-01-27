import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// entities
import { ItemEntity } from './entities/item.entity';
import { OrderEntity } from './entities/order.entity';
import { ProductEntity } from './entities/product.entity';
import { CategoryEntity } from './entities/category.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ItemEntity,
      OrderEntity,
      ProductEntity,
      CategoryEntity,
    ]),
  ],
  controllers: [],
})
export class StockModule {}
