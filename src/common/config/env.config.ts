import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    environment: process.env.NODE_ENV || 'local',
    mysqlDatabase: {
      host: process.env.TYPEORM_HOST,
      username: process.env.TYPEORM_USERNAME,
      port: parseInt(process.env.TYPEORM_PORT, 10),
      password: process.env.TYPEORM_PASSWORD,
      database: process.env.TYPEORM_DATABASE,
      synchronize: Boolean(process.env.TYPEORM_SYNCHRONIZE) ?? false,
      migrations: process.env.TYPEORM_MIGRATIONS,
    },
    server: {
      port: process.env.PORT,
    },
    token: {
      email: process.env.EMAIL_TOKEN,
      password: process.env.PASSWORD_TOKEN,
    },
    api: {
      authServiceBaseUrl: process.env.AUTH_SERVICE_BASE_URL,
      settingNestServiceBaseUrl: process.env.SETTING_NEST_SERVICE_BASE_URL,
      userServiceBaseUrl: process.env.USER_SERVICE_BASE_URL,
    },
  };
});
