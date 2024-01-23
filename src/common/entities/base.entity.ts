import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { AutoMap } from '@automapper/classes';

export class BaseEntity {
  @AutoMap()
  @PrimaryGeneratedColumn()
  readonly id?: number;

  @AutoMap()
  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  readonly createdAt?: Date;

  @AutoMap()
  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  readonly updatedAt?: Date;

  @AutoMap()
  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp' })
  readonly deletedAt?: Date;

  constructor(params: BaseEntity) {
    Object.assign(this, params);
  }
}
