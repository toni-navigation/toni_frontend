import * as SecureStore from 'expo-secure-store';

import { client } from '@/services/api-backend';

client.setConfig({
  baseUrl: 'http://localhost:3000',
});
export const TOKEN = 'token';
client.interceptors.request.use(async (request, options) => {
  const token = await SecureStore.getItemAsync(TOKEN);
  console.log(`Client ${token}`);
  if (token) {
    request.headers.set('Authorization', `Bearer ${token}`);
  }

  return request;
});
//
// client.interceptors.response.use(
//   (response) => response,
//   async (error: any) => {
//     // Add type annotation for error
//     if (error.response?.status === 401) {
//       const { onLogout } = useAuthStore.ts.getState().actions;
//       onLogout(); // Clear the token if unauthorized
//       // Optionally navigate to a login screen or show an alert
//     }
//
//     return Promise.reject(error);
//   }
// );
