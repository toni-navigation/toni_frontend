import { BASE_URL } from '@/functions/api';
import {
  CreateUserDto,
  usersControllerCreateUser,
} from '@/services/api-backend';

export async function registerUser(data: CreateUserDto) {
  const response = await usersControllerCreateUser({
    body: data,
    baseUrl: BASE_URL,
  });
  // if (response.error) {
  //   // throw response.error;
  //   console.log(response.error.message);
  //   throw new Error(response.error?.message || 'An error occurred');
  // }

  return response.data;
}
