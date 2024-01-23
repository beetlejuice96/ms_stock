import { Test, TestingModule } from '@nestjs/testing';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { LoggerModule } from '@/logger/logger.module';
import { ContextStorageModule } from '@/context-storage/context-storage.module';
import config from '@/common/config/env.config';
import { validationSchema } from '@/common/config/env.validation-schema';

describe('AuthService', () => {
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        HttpModule.registerAsync({
          imports: [ConfigModule],
          useFactory: async (configService: ConfigService) => ({
            baseURL: configService.get('AUTH_SERVICE_BASE_URL'),
            timeout: 5000,
            maxRedirects: 5,
          }),
          inject: [ConfigService],
        }),
        ConfigModule.forRoot({
          envFilePath:
            process.cwd() === '/app' ? '/environment/config.map' : '.env',
          load: [config],
          isGlobal: true,
          validationSchema,
        }),
        LoggerModule,
        ContextStorageModule,
      ],
      providers: [AuthService],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });
});
