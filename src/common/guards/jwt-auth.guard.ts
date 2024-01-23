// import {
//   CanActivate,
//   ExecutionContext,
//   Injectable,
//   UnauthorizedException,
// } from '@nestjs/common';

// import { AuthService } from '@/api/auth/services/auth.service';
// import { LoggerService } from '@/logger/services/logger.service';
// import { JwtValidateResponseInterface } from '@/api/auth/interfaces/jwt-validate-response.interface';
// import { CustomRequestInterface } from '../interfaces/custom-request.interface';
// import { BasePropertyDto } from '../dtos/base-property.dto';

// @Injectable()
// export class JwtAuthGuard implements CanActivate {
//   private className = JwtAuthGuard.name;

//   constructor(
//     private authService: AuthService,
//     private loggerService: LoggerService,
//   ) {}

//   async canActivate(context: ExecutionContext): Promise<boolean> {
//     try {
//       this.loggerService.log({
//         className: this.className,
//         method: 'canActivate',
//       });
//       const req = context
//         .switchToHttp()
//         .getRequest<CustomRequestInterface<BasePropertyDto>>();
//       const jwt = req.headers['authorization']?.split(' ')[1];

//       let response: JwtValidateResponseInterface;
//       if (jwt) {
//         response = await this.authService.jwtAuthValidate(jwt);
//       }
//       if (!response) {
//         throw new UnauthorizedException();
//       }
//       const { id } = response;
//       req.property.userId = id;
//       const isAuth = true;
//       return isAuth;
//     } catch (e) {
//       this.loggerService.error({
//         className: this.className,
//         method: 'canActivate',
//         payload: e,
//       });
//       if (e?.response?.status === 401) {
//         throw new UnauthorizedException();
//       }
//       throw e;
//     }
//   }
// }
