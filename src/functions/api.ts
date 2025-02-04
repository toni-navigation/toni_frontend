import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { jwtDecode } from 'jwt-decode';

// const BASE_URL = Platform.OS ? 'http://127.0.0.1:3000' : 'http://10.0.2.2:3000'; // Replace with your API base URL
// IOS
// const BASE_URL = 'http://127.0.0.1:3000';
// ANDROID
const BASE_URL = 'http://10.0.2.2:3000';
const api = axios.create({
  // baseURL: process.env.EXPO_PUBLIC_LOCAL_URL_IOS, // Replace with your API base URL
  // baseURL: 'http://127.0.0.1:3000', // Replace with your API base URL
  baseURL: BASE_URL,
});
// Add an interceptor to attach the token to requests
api.interceptors.request.use(
  async (config) => {
    const token = await SecureStore.getItemAsync('AUTH_STORE');
    if (token) {
      const parsedToken = JSON.parse(token).token;
      if (parsedToken) {
        const decodedToken: { exp: number } = jwtDecode(parsedToken);
        const currentTime = Date.now() / 1000;

        // Check if the token has expired
        if (decodedToken.exp < currentTime) {
          // Handle token expiration, e.g., refresh or redirect to login
          console.warn('Token has expired. Please login again.');
        } else {
          config.headers.Authorization = `Bearer ${parsedToken}`;
        }
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);
export { api, BASE_URL };
