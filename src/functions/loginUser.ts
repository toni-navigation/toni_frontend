import { BASE_URL } from '@/functions/api';
import {
  authenticationControllerLogin,
  LoginUserDto,
} from '@/services/api-backend';

export async function loginUser(data: LoginUserDto) {
  const response = await authenticationControllerLogin({
    body: data,
    baseUrl: BASE_URL,
  });

  if (response.error) {
    throw new Error(response.error.message);
  }

  return response.data;
}
