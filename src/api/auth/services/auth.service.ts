import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';

import { LoggerService } from '@/logger/services/logger.service';
import { JwtValidateResponseInterface } from '@/api/auth/interfaces/jwt-validate-response.interface';
import { LoginEmailBodyInterface } from '../interfaces/login-email-body.interface';
import { LoginEmailResponseInterface } from '../interfaces/login-email-response.interface';

@Injectable()
export class AuthService {
  private className = AuthService.name;

  constructor(
    private loggerService: LoggerService,
    private httpService: HttpService,
  ) {}

  async jwtAuthValidate(jwt: string): Promise<JwtValidateResponseInterface> {
    try {
      this.loggerService.log({
        className: this.className,
        method: 'jwtAuthValidate',
        payload: jwt,
      });
      let isValid = {} as JwtValidateResponseInterface;
      const response =
        await this.httpService.axiosRef.get<JwtValidateResponseInterface>(
          '/api/v2/auth-services/auth/jwt-validate',
          {
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          },
        );
      if (response.status === 200) {
        isValid = response.data;
      }
      return isValid;
    } catch (e) {
      this.loggerService.error({
        className: this.className,
        method: 'jwtAuthValidate',
        payload: e,
      });
      throw e;
    }
  }

  async loginWithEmail(
    payload: LoginEmailBodyInterface,
  ): Promise<LoginEmailResponseInterface> {
    try {
      this.loggerService.log({
        className: this.className,
        method: 'loginWithEmail',
      });
      let result: LoginEmailResponseInterface;
      const response = await this.httpService.axiosRef.post<
        LoginEmailResponseInterface,
        AxiosResponse<LoginEmailResponseInterface>,
        LoginEmailBodyInterface
      >('/api/v2/auth-services/auth/email-login', payload);
      if (response.status === 200) {
        result = response.data;
      }
      return result;
    } catch (e) {
      this.loggerService.error({
        className: this.className,
        method: 'loginWithEmail',
        payload: e,
      });
      throw e;
    }
  }
}
