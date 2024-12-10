import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

// Define the type for the Auth state
type AuthState = {
  token: string | null;
  actions: {
    addToken: (token: string) => void;
    removeToken: () => void;
  };
};

const defaultAuthState: Omit<AuthState, 'actions'> = {
  token: null,
};

export const useAuthStore = create<AuthState>()(
  immer((set) => ({
    ...defaultAuthState,
    actions: {
      addToken: async (token: string) => {
        set((state) => {
          state.token = token;
        });
      },
      removeToken: async () => {
        set((state) => {
          state.token = null;
        });
      },
    },
  }))
);
