import { ApiProperty } from '@nestjs/swagger';
import { AutoMap } from '@automapper/classes';

export class BaseResponseDto {
  @ApiProperty()
  @AutoMap()
  id!: number;

  @ApiProperty()
  @AutoMap()
  createdAt!: Date;

  @ApiProperty()
  @AutoMap()
  updatedAt!: Date;

  @ApiProperty()
  @AutoMap()
  deletedAt!: Date;

  constructor(params: BaseResponseDto) {
    Object.assign(this, params);
  }
}
