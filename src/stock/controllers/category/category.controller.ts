import { LoggerService } from '@/logger/services/logger.service';
import { CategoryBodyDto } from '@/stock/dtos/category-body.dto';
import { CategoryResponseDto } from '@/stock/dtos/category-response.dto';
import { Body, Controller, Post, Version } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('categories')
@Controller('/stock-services/categories')
export class CategoryController {
  private className = CategoryController.name;

  constructor(private loggerService: LoggerService) {}

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
      });
      const response = await this.categoryService.create(payload);
      return response;
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
