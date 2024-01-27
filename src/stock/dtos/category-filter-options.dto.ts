import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, IsInt } from 'class-validator';
import { AutoMap } from '@automapper/classes';

export class CategoryFilterOptionsDto {
  @ApiPropertyOptional()
  @AutoMap()
  @Type(() => Number)
  @IsInt()
  @IsOptional()
  readonly id?: number;

  constructor(params: CategoryFilterOptionsDto) {
    Object.assign(this, params);
  }
}
