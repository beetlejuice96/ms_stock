import { FindOptionsWhere, FindOptionsRelations } from 'typeorm';

export interface BaseCrudBaseParamsInterface<Entity> {
  relations?: FindOptionsRelations<Entity>;
  where?: FindOptionsWhere<Entity>;
}
