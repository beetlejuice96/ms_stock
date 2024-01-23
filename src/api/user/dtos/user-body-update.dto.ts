import { PartialType } from '@nestjs/swagger';

import { UserBodyDto } from './user-body.dto';

export class UserBodyUpdateDto extends PartialType(UserBodyDto) {
  constructor(params: UserBodyUpdateDto) {
    super();
    Object.assign(this, params);
  }
}
