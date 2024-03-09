import { LoggerService } from '@/logger/services/logger.service';
import { CategoryBodyDto } from '@/stock/dtos/category-body.dto';
import { CategoryResponseDto } from '@/stock/dtos/category-response.dto';
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
import { CategoryOperationService } from '@/stock/operation-services/category.operation-service';
import { ParamsInterceptor } from '@/common/interceptors/params.interceptor';
import { BaseIdParamDto } from '@/common/dtos/base-id-param.dto';
import { BaseFindOnePropertyDto } from '@/common/dtos/base-find-one-property.dto';
import { CategoryEntity } from '@/stock/entities/category.entity';
import { Property } from '@/common/decorators/property.decorator';
import { ApiPaginatedResponse } from '@/common/decorators/api-paginated-response.decorator';
import { CategoryQueryParamsDto } from '@/stock/dtos/category-query-params.dto';
import { PaginationResponseDto } from '@/common/dtos/pagination-response.dto';
import { CategoryBodyUpdateDto } from '@/stock/dtos/category-body-update.dto';

@ApiTags('categories')
@Controller('/stock-services/categories')
export class CategoryController {
  private className = CategoryController.name;

  constructor(
    private loggerService: LoggerService,
    private categoryOperationService: CategoryOperationService,
  ) {}

  // @ApiBearerAuth()
  @ApiOperation({ summary: 'create' })
  @Version('2')
  // @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body()
    payload: CategoryBodyDto,
  ): Promise<CategoryResponseDto> {
    try {
      this.loggerService.log({
        className: this.className,
        method: 'create',
        payload,
      });
      return await this.categoryOperationService.create(payload);
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
    { entity }: BaseFindOnePropertyDto<CategoryEntity>,
  ): Promise<CategoryResponseDto> {
    try {
      this.loggerService.log({
        className: this.className,
        method: 'findOne',
      });
      return await this.categoryOperationService.findOne(entity);
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
  @ApiPaginatedResponse(CategoryResponseDto)
  @Version('2')
  @Get()
  async findAll(
    @Query() queryParams: CategoryQueryParamsDto,
  ): Promise<PaginationResponseDto<CategoryResponseDto>> {
    try {
      this.loggerService.log({
        className: this.className,
        method: 'findAll',
        payload: queryParams,
      });
      return await this.categoryOperationService.findAll(queryParams);
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
    @Body() payload: CategoryBodyUpdateDto,
  ): Promise<CategoryResponseDto> {
    try {
      this.loggerService.log({
        className: this.className,
        method: 'update',
      });
      return await this.categoryOperationService.update(id, payload);
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
  async remove(@Param() { id }: BaseIdParamDto): Promise<CategoryResponseDto> {
    try {
      this.loggerService.log({
        className: this.className,
        method: 'remove',
      });
      return await this.categoryOperationService.remove(id);
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
