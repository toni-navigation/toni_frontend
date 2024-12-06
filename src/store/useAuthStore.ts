import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

import { deleteToken, getToken, saveToken } from '@/store/secureStore';

// Define the type for the Auth state
type AuthState = {
  token: string | null;
  actions: {
    onLogin: (token: string) => void;
    onLogout: () => void;
    loadToken: () => void;
  };
};

const defaultAuthState: Omit<AuthState, 'actions'> = {
  token: null,
};

const TOKEN = 'token';
export const useAuthStore = create<AuthState>()(
  immer((set) => ({
    ...defaultAuthState,
    actions: {
      onLogin: async (token: string) => {
        try {
          await saveToken(TOKEN, token);
          set((state) => {
            state.token = token;
          });
        } catch (error) {
          console.error(error);
        }
      },
      onLogout: async () => {
        try {
          await deleteToken(TOKEN);
          set((state) => {
            state.token = null;
          });
        } catch (error) {
          console.error(error);
        }
      },
      loadToken: async () => {
        try {
          const token = await getToken(TOKEN);
          set({ token });
        } catch (error) {
          console.error(error);
        }
      },
    },
  }))
);
