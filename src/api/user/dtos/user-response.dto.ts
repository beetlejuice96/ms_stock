import { ApiProperty, IntersectionType } from '@nestjs/swagger';
import { AutoMap } from '@automapper/classes';

import { BaseResponseDto } from '@/common/dtos/base-response.dto';

export class UserResponseDto extends IntersectionType(BaseResponseDto) {
  @AutoMap()
  @ApiProperty()
  readonly name?: string;

  @AutoMap()
  @ApiProperty()
  readonly lastname?: string;

  @AutoMap()
  @ApiProperty()
  readonly email?: string;

  @AutoMap()
  @ApiProperty()
  readonly password?: string;

  @AutoMap()
  @ApiProperty()
  readonly msisdn?: number;

  @AutoMap()
  @ApiProperty()
  readonly isAdmin?: boolean;

  constructor(params: UserResponseDto) {
    super();
    Object.assign(this, params);
  }
}
