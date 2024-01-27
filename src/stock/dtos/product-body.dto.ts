import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class ProductBodyDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  readonly name!: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  readonly categoryId!: number;

  constructor(params: ProductBodyDto) {
    Object.assign(this, params);
  }
}
