import { Repository, DeepPartial, FindOptionsOrder } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

import { BaseCrudInterface } from '../interfaces/base-crud.interface';
import { BaseCrudCreateParamsInterface } from '../interfaces/base-crud-create-params.interface';
import { BaseCrudFindOneParamsInterface } from '../interfaces/base-crud-find-one-params.interface';
import { BaseCrudFindAllParamsInterface } from '../interfaces/base-crud-find-all-params.interface';
import { BaseCrudUpdateParamsInterface } from '../interfaces/base-crud-update-params.interface';
import { BaseCrudRemoveParamsInterface } from '../interfaces/base-crud-remove-params.interface';
import { BaseCrudRestoreParamsInterface } from '../interfaces/base-crud-restore-params.interface';
import { BaseCrudFindOneResponseType } from '../types/base-crud-find-one-response.type';
import { LoggerService } from '@/logger/services/logger.service';
import { BaseEntity } from '../entities/base.entity';
import { PaginationOptionsDto } from '../dtos/pagination-options.dto';
import { PaginationResponseDto } from '../dtos/pagination-response.dto';
import { PaginationMetaDto } from '../dtos/pagination-meta.dto';
import { Order } from '../consts/order.const';

export class BaseCrudService<Entity extends BaseEntity, EntityBodyDto>
  implements BaseCrudInterface<Entity, EntityBodyDto>
{
  constructor(
    private entityRepository: Repository<Entity>,
    private logger: LoggerService,
  ) {}

  async create({
    payload,
    relations,
  }: BaseCrudCreateParamsInterface<Entity, EntityBodyDto>): Promise<Entity> {
    try {
      this.logger.log({
        className: BaseCrudService.name,
        method: 'create',
        payload: payload,
      });
      const newEntity: Entity = await this.entityRepository.save(
        payload as DeepPartial<Entity>,
      );
      const { id } = newEntity;
      const foundEntity = await this.findOne({ id, relations });
      return foundEntity;
    } catch (e) {
      this.logger.error({
        className: BaseCrudService.name,
        method: 'create',
        payload: e,
      });
      throw e;
    }
  }

  async findOne({
    id,
    relations,
    where,
    withDeleted,
  }: BaseCrudFindOneParamsInterface<Entity>): Promise<
    BaseCrudFindOneResponseType<Entity>
  > {
    try {
      this.logger.log({
        className: BaseCrudService.name,
        method: 'findOne',
        payload: { id: id },
      });
      const foundEntity = await this.entityRepository.findOne({
        where: { id, ...where },
        relations,
        withDeleted,
      });
      return foundEntity;
    } catch (e) {
      this.logger.error({
        className: BaseCrudService.name,
        method: 'findOne',
        payload: e,
      });
      throw e;
    }
  }

  async findAll({
    paginationOptions = new PaginationOptionsDto({
      order: Order.ASC,
      page: 1,
      take: 10,
    }),
    relations,
    where,
  }: BaseCrudFindAllParamsInterface<Entity>): Promise<
    PaginationResponseDto<Entity>
  > {
    try {
      this.logger.log({
        className: BaseCrudService.name,
        method: 'findAll',
      });
      const { order, take, page } = paginationOptions;
      const skip = (page - 1) * take;
      const [entities, itemCount] = await this.entityRepository.findAndCount({
        relations,
        where,
        skip,
        take,
        order: { createdAt: order } as FindOptionsOrder<Entity>,
      });

      const paginationMeta = new PaginationMetaDto({
        paginationOptions,
        itemCount,
      });
      const paginationResponse = new PaginationResponseDto(
        entities,
        paginationMeta,
      );

      return paginationResponse;
    } catch (e) {
      this.logger.error({
        className: BaseCrudService.name,
        method: 'findAll',
        payload: e,
      });
      throw e;
    }
  }

  async update({
    id,
    payload,
    relations,
    where,
  }: BaseCrudUpdateParamsInterface<Entity, EntityBodyDto>): Promise<
    BaseCrudFindOneResponseType<Entity>
  > {
    try {
      this.logger.log({
        className: BaseCrudService.name,
        method: 'update',
        payload: { id: id },
      });
      await this.entityRepository.update(
        {
          id,
          ...where,
        },
        payload as unknown as QueryDeepPartialEntity<Entity>,
      );
      const updatedEntity = await this.findOne({ id, relations });

      return updatedEntity;
    } catch (e) {
      this.logger.error({
        className: BaseCrudService.name,
        method: 'update',
        payload: { id: id },
      });
      throw e;
    }
  }

  async remove({
    id,
    relations,
    where,
  }: BaseCrudRemoveParamsInterface<Entity>): Promise<
    BaseCrudFindOneResponseType<Entity>
  > {
    try {
      this.logger.log({
        className: BaseCrudService.name,
        method: 'remove',
        payload: { id: id },
      });
      let entityId: number;

      if (typeof id === 'number') {
        // softDelete
        await this.entityRepository.softDelete({
          id,
          ...where,
        });
        entityId = id;
      } else {
        // softRemove
        await this.entityRepository.softRemove(id);
        entityId = id.id;
      }

      const deletedEntity = await this.findOne({
        id: entityId,
        relations,
        withDeleted: true,
      });
      return deletedEntity;
    } catch (e) {
      this.logger.error({
        className: BaseCrudService.name,
        method: 'remove',
        payload: { id: id },
      });
      throw e;
    }
  }

  async restore({
    id,
    relations,
  }: BaseCrudRestoreParamsInterface<Entity>): Promise<
    BaseCrudFindOneResponseType<Entity>
  > {
    try {
      this.logger.log({
        className: BaseCrudService.name,
        method: 'restore',
        payload: { id: id },
      });
      await this.entityRepository.restore(id);
      const restoreEntity = await this.findOne({ id, relations });
      return restoreEntity;
    } catch (e) {
      this.logger.error({
        className: BaseCrudService.name,
        method: 'remove',
        payload: { id: id },
      });
      throw e;
    }
  }
}
