import * as SecureStore from 'expo-secure-store';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

// Define the type for the Auth state
type AuthState = {
  token: string | null;
  isAuthenticated: boolean;
  actions: {
    onLogin: (token: string) => void;
    onLogout: () => void;
    checkAuth: () => void;
    resetAuthStore: () => void;
  };
};

// Default state
const defaultAuthState: Omit<AuthState, 'actions'> = {
  token: null,
  isAuthenticated: false,
};

// Configure SecureStore for zustand
const secureStorage = createJSONStorage(() => ({
  getItem: SecureStore.getItemAsync,
  setItem: SecureStore.setItemAsync,
  removeItem: SecureStore.deleteItemAsync,
}));

// Create the Zustand store
export const useAuthStore = create<AuthState>()(
  persist(
    immer((set) => ({
      ...defaultAuthState,
      actions: {
        onLogin: (token: string) => {
          set((state) => {
            state.token = token;
            state.isAuthenticated = true;
          });
        },
        onLogout: () =>
          set((state) => {
            state.token = null;
            state.isAuthenticated = false;
          }),
        checkAuth: () =>
          set((state) => {
            state.isAuthenticated = !!state.token;
          }),
        resetAuthStore: () =>
          set((state) => ({ ...state, ...defaultAuthState })),
      },
    })),
    {
      name: `AUTH_STORE`,
      storage: secureStorage,
      partialize: ({ token, isAuthenticated }) => ({
        token,
        isAuthenticated,
      }),
      version: 1,
    }
  )
);
