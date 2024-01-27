import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// entities
import { ItemEntity } from './entities/item.entity';
import { OrderEntity } from './entities/order.entity';
import { ProductEntity } from './entities/product.entity';
import { CategoryEntity } from './entities/category.entity';
import { CategoryOperationService } from '@/stock/operation-services/category.operation-service';
import { CategoryController } from '@/stock/controllers/category/category.controller';
import { CategoryService } from '@/stock/services/category/category.service';
import { ProductMapper } from '@/stock/mappers/product.mapper';
import { ItemMapper } from '@/stock/mappers/item.mapper';
import { CategoryMapper } from '@/stock/mappers/category.mapper';
import { TypeOrmUtil } from '@/common/utils/typeorm.util';
import { ProductService } from '@/stock/services/product/product.service';
import { ProductController } from './controllers/product/product.controller';
import {ProductOperationService} from "@/stock/operation-services/product.operation-service";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ItemEntity,
      OrderEntity,
      ProductEntity,
      CategoryEntity,
    ]),
  ],
  controllers: [CategoryController, ProductController],
  providers: [
    // utils
    TypeOrmUtil,
    //mappers
    ProductMapper,
    ItemMapper,
    CategoryMapper,
    //services
    CategoryService,
    ProductService,
    //operationService
    CategoryOperationService,
    ProductOperationService,

  ],
})
export class StockModule {}
