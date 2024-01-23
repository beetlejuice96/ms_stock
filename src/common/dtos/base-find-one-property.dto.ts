import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { Transform } from 'class-transformer';

import { BasePropertyDto } from './base-property.dto';

export class BaseFindOnePropertyDto<TEntity = unknown> extends PartialType(
  BasePropertyDto,
) {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber(undefined, { message: 'id must be a number' })
  @Transform(({ value }) => parseInt(value))
  readonly id!: number;

  @ApiProperty()
  readonly entity!: TEntity;

  constructor(params: BaseFindOnePropertyDto<TEntity>) {
    const childParams: Omit<BaseFindOnePropertyDto<TEntity>, 'userId'> = {
      ...params,
    };
    super({ userId: params?.userId });
    Object.assign(this, childParams);
  }
}
