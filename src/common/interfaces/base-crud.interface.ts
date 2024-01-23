import { PaginationResponseDto } from '../dtos/pagination-response.dto';
import { BaseCrudCreateParamsInterface } from './base-crud-create-params.interface';
import { BaseCrudFindOneParamsInterface } from './base-crud-find-one-params.interface';
import { BaseCrudFindAllParamsInterface } from './base-crud-find-all-params.interface';
import { BaseCrudUpdateParamsInterface } from './base-crud-update-params.interface';
import { BaseCrudRemoveParamsInterface } from './base-crud-remove-params.interface';
import { BaseCrudRestoreParamsInterface } from './base-crud-restore-params.interface';
import { BaseCrudFindOneResponseType } from '../types/base-crud-find-one-response.type';

export interface BaseCrudInterface<Entity, EntityBodyDto> {
  create: (
    params: BaseCrudCreateParamsInterface<Entity, EntityBodyDto>,
  ) => Promise<Entity>;
  findOne: (
    params: BaseCrudFindOneParamsInterface<Entity>,
  ) => Promise<BaseCrudFindOneResponseType<Entity>>;
  findAll: (
    params: BaseCrudFindAllParamsInterface<Entity>,
  ) => Promise<PaginationResponseDto<Entity>>;
  update: (
    params: BaseCrudUpdateParamsInterface<Entity, EntityBodyDto>,
  ) => Promise<BaseCrudFindOneResponseType<Entity>>;
  remove: (
    params: BaseCrudRemoveParamsInterface<Entity>,
  ) => Promise<BaseCrudFindOneResponseType<Entity>>;
  restore: (
    params: BaseCrudRestoreParamsInterface<Entity>,
  ) => Promise<BaseCrudFindOneResponseType<Entity>>;
}
