import { PartialType } from '@nestjs/swagger';
import { CategoryBodyDto } from './category-body.dto';

export class CategoryBodyUpdateDto extends PartialType(CategoryBodyDto) {
  constructor(params: CategoryBodyUpdateDto) {
    super();
    Object.assign(this, params);
  }
}
