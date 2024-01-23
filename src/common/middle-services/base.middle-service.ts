import { ConfigType } from '@nestjs/config';

import config from '@/common/config/env.config';
import { LoggerService } from '@/logger/services/logger.service';
import { AuthService } from '@/api/auth/services/auth.service';
import { ContextStorageService } from '@/context-storage/services/context-storage.service';
import { CONTEXT_STORAGE_KEY } from '@/context-storage/enums/context-storage-key.enum';

export abstract class BaseMiddleService {
  private name = BaseMiddleService.name;

  constructor(
    protected authService: AuthService,
    protected loggerService: LoggerService,
    protected configService: ConfigType<typeof config>,
    protected contextStorageService: ContextStorageService,
  ) {}

  protected async getJwt(): Promise<string> {
    try {
      this.loggerService.log({
        className: this.name,
        method: 'getJwt',
      });
      let token = this.getJwtFromRequest();
      if (!token) {
        const { email, password } = this.configService.token;
        const { _token } = await this.authService.loginWithEmail({
          email,
          password,
        });
        token = _token;
      }
      return token;
    } catch (e) {
      this.loggerService.error({
        className: this.name,
        method: 'getJwt',
        payload: e,
      });
      throw e;
    }
  }

  private getJwtFromRequest(): string | undefined {
    try {
      this.loggerService.log({
        className: this.name,
        method: 'getJwtFromRequest',
      });
      const token = this.contextStorageService.get<string>(
        CONTEXT_STORAGE_KEY.ACCESS_TOKEN,
      );
      return token;
    } catch (e) {
      this.loggerService.error({
        className: this.name,
        method: 'getJwtFromRequest',
        payload: e,
      });
      throw e;
    }
  }
}
