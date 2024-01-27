import { BaseCrudService } from '@/common/services/base-crud.service';
import { LoggerService } from '@/logger/services/logger.service';
import { CategoryBodyDto } from '@/stock/dtos/category-body.dto';
import { CategoryEntity } from '@/stock/entities/category.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService extends BaseCrudService<
  CategoryEntity,
  CategoryBodyDto
> {
  private className = CategoryService.name;

  constructor(
    @InjectRepository(CategoryEntity)
    private categoryRepository: Repository<CategoryEntity>,
    private loggerService: LoggerService,
  ) {
    super(categoryRepository, loggerService);
  }
}
