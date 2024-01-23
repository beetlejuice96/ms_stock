import { BaseCrudBaseParamsInterface } from './base-crud-base-params.interface';

export interface BaseCrudRestoreParamsInterface<Entity>
  extends Pick<BaseCrudBaseParamsInterface<Entity>, 'relations'> {
  id: number;
}
