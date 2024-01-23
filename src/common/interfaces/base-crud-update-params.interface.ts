import { BaseCrudBaseParamsInterface } from './base-crud-base-params.interface';

export interface BaseCrudUpdateParamsInterface<Entity, EntityBodyDto>
  extends BaseCrudBaseParamsInterface<Entity> {
  id: number;
  payload: Partial<EntityBodyDto>;
}
