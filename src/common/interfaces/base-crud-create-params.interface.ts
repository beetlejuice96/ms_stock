import { BaseCrudBaseParamsInterface } from './base-crud-base-params.interface';
export interface BaseCrudCreateParamsInterface<Entity, EntityBodyDto>
  extends BaseCrudBaseParamsInterface<Entity> {
  payload: EntityBodyDto;
}
