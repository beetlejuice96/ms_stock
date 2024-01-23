import { Module, Global } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { LoggerService } from './services/logger.service';
import { WinstonLoggerService } from './services/winston-logger.service';
import loggerOptions from '@/common/config/logger.config';
import { ContextStorageService } from '@/context-storage/services/context-storage.service';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [loggerOptions],
    }),
  ],
  providers: [LoggerService, ContextStorageService, WinstonLoggerService],
  exports: [LoggerService, WinstonLoggerService],
})
export class LoggerModule {}
