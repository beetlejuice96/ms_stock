import { LoggerService } from '@/logger/services/logger.service';
import { CategoryService } from '../services/category/category.service';
import { Injectable } from '@nestjs/common';
import { CategoryResponseDto } from '../dtos/category-response.dto';
import { CategoryBodyDto } from '../dtos/category-body.dto';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { CategoryEntity } from '../entities/category.entity';
import { CategoryQueryParamsDto } from '@/stock/dtos/category-query-params.dto';
import { PaginationResponseDto } from '@/common/dtos/pagination-response.dto';
import { PaginationOptionsDto } from '@/common/dtos/pagination-options.dto';
import { CategoryFilterOptionsDto } from '@/stock/dtos/category-filter-options.dto';
import { TypeOrmUtil } from '@/common/utils/typeorm.util';
import {CategoryBodyUpdateDto} from "@/stock/dtos/category-body-update.dto";

@Injectable()
export class CategoryOperationService {
  private className = CategoryOperationService.name;

  constructor(
    private categoryService: CategoryService,
    private loggerService: LoggerService,
    private typeOrmUtil: TypeOrmUtil,
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

  async findOne(entity: CategoryEntity): Promise<CategoryResponseDto> {
    try {
      this.loggerService.log({
        className: this.className,
        method: 'findOne',
        payload: { entity },
      });
      return this.mapper.map(entity, CategoryEntity, CategoryResponseDto);
    } catch (e) {
      this.loggerService.error({
        className: this.className,
        method: 'findOne',
        payload: e,
      });
      throw e;
    }
  }

  async findAll(
    queryParams: CategoryQueryParamsDto,
  ): Promise<PaginationResponseDto<CategoryResponseDto>> {
    try {
      this.loggerService.log({
        className: this.className,
        method: 'findAll',
        payload: queryParams,
      });
      const { order, page, take, ...others } = queryParams;
      const paginationOptions = new PaginationOptionsDto({ order, page, take });
      const filterOptions = new CategoryFilterOptionsDto(others);
      const where =
        this.typeOrmUtil.buidWhereObject<CategoryFilterOptionsDto>(
          filterOptions,
        );
      const { data, meta } = await this.categoryService.findAll({
        paginationOptions,
        where,
      });
      const newData = data.map((user) => {
        return this.mapper.map(user, CategoryEntity, CategoryResponseDto);
      });
      return new PaginationResponseDto<CategoryResponseDto>(newData, meta);
    } catch (e) {
      this.loggerService.error({
        className: this.className,
        method: 'findAll',
        payload: e,
      });
      throw e;
    }
  }

  async update(
    id: number,
    payload: CategoryBodyUpdateDto,
  ): Promise<CategoryResponseDto> {
    try {
      this.loggerService.log({
        className: this.className,
        method: 'update',
        payload: { id, payload },
      });
      let response: CategoryResponseDto | undefined = undefined;
      const updatedEntity = await this.categoryService.update({ id, payload });
      if (updatedEntity) {
        response = this.mapper.map(
          updatedEntity,
          CategoryEntity,
          CategoryResponseDto,
        );
      }
      return response;
    } catch (e) {
      this.loggerService.error({
        className: this.className,
        method: 'update',
        payload: e,
      });
      throw e;
    }
  }

  async remove(id: number): Promise<CategoryResponseDto> {
    try {
      this.loggerService.log({
        className: this.className,
        method: 'remove',
        payload: { id },
      });
      let response: CategoryResponseDto | undefined = undefined;
      const deletedEntity = await this.categoryService.remove({ id });
      if (deletedEntity) {
        response = this.mapper.map(
          deletedEntity,
          CategoryEntity,
          CategoryResponseDto,
        );
      }
      return response;
    } catch (e) {
      this.loggerService.error({
        className: this.className,
        method: 'remove',
        payload: e,
      });
      throw e;
    }
  }
}
