import { ApiProperty } from '@nestjs/swagger';

export class BasePropertyDto {
  @ApiProperty()
  userId!: number;

  constructor(params: BasePropertyDto) {
    Object.assign(this, params);
  }
}
