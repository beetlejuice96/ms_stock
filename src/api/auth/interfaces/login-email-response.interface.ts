import { UserResponseDto } from '@/api/user/dtos/user-response.dto';

export interface LoginEmailResponseInterface {
  _token: string;
  message: string;
  user: UserResponseDto;
}
