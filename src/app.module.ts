import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import config from '@/common/config/env.config';
import { validationSchema } from '@/common/config/env.validation-schema';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';
import { AuthModule } from './api/auth/auth.module';
import { CustomRequestPropertiesMiddleware } from './common/middlewares/custom-request-properties.middleware';
import { LoggerModule } from './logger/logger.module';
import { ContextStorageModule } from './context-storage/context-storage.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath:
        process.cwd() === '/app' ? '/environment/config.map' : '.env',
      load: [config],
      isGlobal: true,
      validationSchema,
    }),
    AutomapperModule.forRoot({ strategyInitializer: classes() }),
    AuthModule,
    LoggerModule,
    ContextStorageModule,
    DatabaseModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CustomRequestPropertiesMiddleware).forRoutes('*');
  }
}
