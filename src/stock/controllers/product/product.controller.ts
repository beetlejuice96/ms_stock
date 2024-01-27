import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseInterceptors,
  Version,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ProductOperationService } from '@/stock/operation-services/product.operation-service';
import { LoggerService } from '@/logger/services/logger.service';
import { ProductBodyDto } from '@/stock/dtos/product-body.dto';
import { ProductResponseDto } from '@/stock/dtos/product-response.dto';
import { ParamsInterceptor } from '@/common/interceptors/params.interceptor';
import { BaseIdParamDto } from '@/common/dtos/base-id-param.dto';
import { Property } from '@/common/decorators/property.decorator';
import { BaseFindOnePropertyDto } from '@/common/dtos/base-find-one-property.dto';
import { ProductEntity } from '@/stock/entities/product.entity';
import { ApiPaginatedResponse } from '@/common/decorators/api-paginated-response.decorator';
import { PaginationResponseDto } from '@/common/dtos/pagination-response.dto';
import { ProductQueryParamsDto } from '@/stock/dtos/product-query-params.dto';
import { ProductBodyUpdateDto } from '@/stock/dtos/product-body-update.dto';

@ApiTags('products')
@Controller('/stock-services/products')
export class ProductController {
  private className = ProductController.name;

  constructor(
    private loggerService: LoggerService,
    private productOperationService: ProductOperationService,
  ) {}

  s;
  // @ApiBearerAuth()
  @ApiOperation({ summary: 'create' })
  @Version('2')
  // @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body()
    payload: ProductBodyDto,
  ): Promise<ProductResponseDto> {
    try {
      this.loggerService.log({
        className: this.className,
        method: 'create',
      });
      return await this.productOperationService.create(payload);
    } catch (e) {
      this.loggerService.error({
        className: this.className,
        method: 'create',
        payload: e,
      });
      throw e;
    }
  }

  @ApiOperation({ summary: 'find one' })
  @Version('2')
  @UseInterceptors(ParamsInterceptor)
  @Get(':id')
  async findOne(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @Param() params: BaseIdParamDto,
    @Property()
    { entity }: BaseFindOnePropertyDto<ProductEntity>,
  ): Promise<ProductResponseDto> {
    try {
      this.loggerService.log({
        className: this.className,
        method: 'findOne',
        payload: { entity },
      });
      return await this.productOperationService.findOne(entity);
    } catch (e) {
      this.loggerService.error({
        className: this.className,
        method: 'findOne',
        payload: e,
      });
      throw e;
    }
  }

  @ApiOperation({ summary: 'find all' })
  @ApiPaginatedResponse(ProductResponseDto)
  @Version('2')
  @Get()
  async findAll(
    @Query() queryParams: ProductQueryParamsDto,
  ): Promise<PaginationResponseDto<ProductResponseDto>> {
    try {
      this.loggerService.log({
        className: this.className,
        method: 'findAll',
        payload: queryParams,
      });
      return await this.productOperationService.findAll(queryParams);
    } catch (e) {
      this.loggerService.error({
        className: this.className,
        method: 'findAll',
        payload: e,
      });
      throw e;
    }
  }

  // @ApiBearerAuth()
  @ApiOperation({ summary: 'update' })
  @Version('2')
  // @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @Param() { id }: BaseIdParamDto,
    @Body() payload: ProductBodyUpdateDto,
  ): Promise<ProductResponseDto> {
    try {
      this.loggerService.log({
        className: this.className,
        method: 'update',
      });
      return await this.productOperationService.update(id, payload);
    } catch (e) {
      this.loggerService.error({
        className: this.className,
        method: 'update',
        payload: e,
      });
      throw e;
    }
  }

  // @ApiBearerAuth()
  @ApiOperation({ summary: 'remove' })
  @Version('2')
  // @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param() { id }: BaseIdParamDto): Promise<ProductResponseDto> {
    try {
      this.loggerService.log({
        className: this.className,
        method: 'remove',
      });
      return await this.productOperationService.remove(id);
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
