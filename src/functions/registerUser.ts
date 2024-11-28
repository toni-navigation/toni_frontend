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

  if (response.error) {
    throw new Error(response.error.message);
  }

  return response.data;
}
