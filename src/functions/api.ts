import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { jwtDecode } from 'jwt-decode';

const BASE_URL = 'http://localhost:3000'; // Replace with your API base URL
const api = axios.create({
  baseURL: BASE_URL, // Replace with your API base URL
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
        console.log(decodedToken);
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
