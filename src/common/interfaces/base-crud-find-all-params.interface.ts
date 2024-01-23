import { BaseCrudBaseParamsInterface } from './base-crud-base-params.interface';
import { BaseCrudBaseFindParamsInterface } from './base-crud-base-find-params.interface';
import { PaginationOptionsDto } from '../dtos/pagination-options.dto';

export interface BaseCrudFindAllParamsInterface<Entity>
  extends BaseCrudBaseParamsInterface<Entity>,
    BaseCrudBaseFindParamsInterface {
  paginationOptions?: PaginationOptionsDto;
}
