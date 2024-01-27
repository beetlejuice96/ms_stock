import { LoggerService } from '@/logger/services/logger.service';
import { Injectable } from '@nestjs/common';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { TypeOrmUtil } from '@/common/utils/typeorm.util';

//services
import { ProductService } from '@/stock/services/product/product.service';

//dtos
import { PaginationResponseDto } from '@/common/dtos/pagination-response.dto';
import { PaginationOptionsDto } from '@/common/dtos/pagination-options.dto';
import { CategoryFilterOptionsDto } from '@/stock/dtos/category-filter-options.dto';
import { ProductBodyDto } from '@/stock/dtos/product-body.dto';
import { ProductResponseDto } from '@/stock/dtos/product-response.dto';
import { ProductEntity } from '@/stock/entities/product.entity';
import { ProductQueryParamsDto } from '@/stock/dtos/product-query-params.dto';
import { ProductBodyUpdateDto } from '@/stock/dtos/product-body-update.dto';

@Injectable()
export class ProductOperationService {
  private className = ProductOperationService.name;

  constructor(
    private productService: ProductService,
    private loggerService: LoggerService,
    private typeOrmUtil: TypeOrmUtil,
    @InjectMapper() private mapper: Mapper,
  ) {}

  async create(payload: ProductBodyDto): Promise<ProductResponseDto> {
    try {
      this.loggerService.log({
        className: this.className,
        method: 'create',
        payload,
      });
      const createdEntity = await this.productService.create({ payload });
      return this.mapper.map(createdEntity, ProductEntity, ProductResponseDto);
    } catch (e) {
      this.loggerService.error({
        className: this.className,
        method: 'create',
        payload: e,
      });
      throw e;
    }
  }

  async findOne(entity: ProductEntity): Promise<ProductResponseDto> {
    try {
      this.loggerService.log({
        className: this.className,
        method: 'findOne',
        payload: { entity },
      });
      return this.mapper.map(entity, ProductEntity, ProductResponseDto);
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
    queryParams: ProductQueryParamsDto,
  ): Promise<PaginationResponseDto<ProductResponseDto>> {
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
      const { data, meta } = await this.productService.findAll({
        paginationOptions,
        where,
      });
      const newData = data.map((user) => {
        return this.mapper.map(user, ProductEntity, ProductResponseDto);
      });
      return new PaginationResponseDto<ProductResponseDto>(newData, meta);
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
    payload: ProductBodyUpdateDto,
  ): Promise<ProductResponseDto> {
    try {
      this.loggerService.log({
        className: this.className,
        method: 'update',
        payload: { id, payload },
      });
      let response: ProductResponseDto | undefined = undefined;
      const updatedEntity = await this.productService.update({ id, payload });
      if (updatedEntity) {
        response = this.mapper.map(
          updatedEntity,
          ProductEntity,
          ProductResponseDto,
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

  async remove(id: number): Promise<ProductResponseDto> {
    try {
      this.loggerService.log({
        className: this.className,
        method: 'remove',
        payload: { id },
      });
      let response: ProductResponseDto | undefined = undefined;
      const deletedEntity = await this.productService.remove({ id });
      if (deletedEntity) {
        response = this.mapper.map(
          deletedEntity,
          ProductEntity,
          ProductResponseDto,
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
