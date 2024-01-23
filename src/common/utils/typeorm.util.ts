import { Injectable } from '@nestjs/common';
import { Equal } from 'typeorm';

import { LoggerService } from '@/logger/services/logger.service';

@Injectable()
export class TypeOrmUtil {
  private className = TypeOrmUtil.name;

  constructor(private loggerService: LoggerService) {}

  buidWhereObject<T>(filterObject: { [key: string]: any }): T {
    try {
      this.loggerService.log({
        className: this.className,
        method: 'buidWhereObject',
        payload: filterObject,
      });
      for (const prop in filterObject) {
        if (filterObject[prop]) {
          filterObject[prop] = Equal(filterObject[prop]);
        }
      }
      return filterObject as T;
    } catch (e) {
      this.loggerService.error({
        className: this.className,
        method: 'buidWhereObject',
        payload: e,
      });
      throw e;
    }
  }
}
