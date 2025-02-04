import { client } from '@/services/api-backend';
import { getToken } from '@/store/secureStore';

client.setConfig({
  // baseUrl: Platform.OS ? 'http://127.0.0.1:3000' : 'http://10.0.2.2:3000',
  // IOS
  // baseUrl:'http://127.0.0.1:3000',
  // ANDROID
  baseUrl: 'http://10.0.2.2:3000',
});
export const TOKEN = 'token';
client.interceptors.request.use(async (request, options) => {
  const token = await getToken(TOKEN);
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
