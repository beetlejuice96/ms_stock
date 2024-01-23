import { BaseCrudBaseParamsInterface } from './base-crud-base-params.interface';
import { BaseCrudBaseFindParamsInterface } from './base-crud-base-find-params.interface';

export interface BaseCrudFindOneParamsInterface<Entity>
  extends BaseCrudBaseParamsInterface<Entity>,
    BaseCrudBaseFindParamsInterface {
  id?: number;
}
