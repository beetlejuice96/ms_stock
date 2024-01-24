import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigType } from '@nestjs/config';
import config from '@/common/config/env.config';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [config.KEY],
      useFactory: async (configService: ConfigType<typeof config>) => {
        const { host, port, username, password, database, migrations } =
          configService.mysqlDatabase;
        return {
          type: 'mysql',
          host,
          port,
          username,
          password,
          database,
          synchronize: false,
          autoLoadEntities: true,
          migrations: [migrations],
        };
      },
    }),
  ],
})
export class DatabaseModule {}
