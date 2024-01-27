import { LoggerService } from '@/logger/services/logger.service';
import { CategoryService } from '../services/category/category.service';
import { Injectable } from '@nestjs/common';
import { CategoryResponseDto } from '../dtos/category-response.dto';
import { CategoryBodyDto } from '../dtos/category-body.dto';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { CategoryEntity } from '../entities/category.entity';

@Injectable()
export class PlayerOperationService {
  private className = PlayerOperationService.name;

  constructor(
    private categoryService: CategoryService,
    private loggerService: LoggerService,
    @InjectMapper() private mapper: Mapper,
  ) {}

  async create(payload: CategoryBodyDto): Promise<CategoryResponseDto> {
    try {
      this.loggerService.log({
        className: this.className,
        method: 'create',
      });
      const createdEntity = await this.categoryService.create({ payload });
      return this.mapper.map(
        createdEntity,
        CategoryEntity,
        CategoryResponseDto,
      );
    } catch (e) {
      this.loggerService.error({
        className: this.className,
        method: 'create',
        payload: e,
      });
      throw e;
    }
  }
}
