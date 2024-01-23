import { BaseCrudBaseParamsInterface } from './base-crud-base-params.interface';

export interface BaseCrudRemoveParamsInterface<Entity>
  extends BaseCrudBaseParamsInterface<Entity> {
  id: number | Entity;
}
