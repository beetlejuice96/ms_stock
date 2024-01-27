import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
//services
import { BaseCrudService } from '@/common/services/base-crud.service';
import { LoggerService } from '@/logger/services/logger.service';

//entities
import { ProductEntity } from '@/stock/entities/product.entity';
//dtos
import { ProductBodyDto } from '@/stock/dtos/product-body.dto';

@Injectable()
export class ProductService extends BaseCrudService<
  ProductEntity,
  ProductBodyDto
> {
  private className = ProductService.name;

  constructor(
    @InjectRepository(ProductEntity)
    private productRepository: Repository<ProductEntity>,
    private loggerService: LoggerService,
  ) {
    super(productRepository, loggerService);
  }
}
