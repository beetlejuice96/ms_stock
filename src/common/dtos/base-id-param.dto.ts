import { PickType } from '@nestjs/swagger';

import { BaseFindOnePropertyDto } from './base-find-one-property.dto';

export class BaseIdParamDto extends PickType(BaseFindOnePropertyDto, [
  'id',
] as const) {
  constructor(params: BaseIdParamDto) {
    super();
    Object.assign(this, params);
  }
}
