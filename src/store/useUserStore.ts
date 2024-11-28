import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { User } from '@/services/api-backend';

export type StoreUser = Omit<User, 'calibrationFactor'> | undefined;

type UserState = {
  user: StoreUser;
  calibrationFactor: number | null;
  actions: {
    addCalibration: (distanceInMeter: number, steps: number) => void;
    resetUserStore: () => void;
    resetCalibration: () => void;
    addUser: (user: StoreUser) => void;
  };
};

const defaultUserState: Omit<UserState, 'actions'> = {
  user: undefined,
  calibrationFactor: null,
};

export const useUserStore = create<UserState>()(
  persist(
    immer((set) => ({
      ...defaultUserState,
      actions: {
        addCalibration: (distanceInMeter, steps) =>
          set((state) => {
            state.calibrationFactor = Number(
              (distanceInMeter / steps).toFixed(2)
            );
          }),
        addUser: (user) =>
          set((state) => {
            state.user = user;
          }),
        resetCalibration: () =>
          set((state) => ({ ...state, calibrationFactor: null })),
        resetUserStore: () =>
          set((state) => ({ ...state, ...defaultUserState })),
      },
    })),
    {
      name: `USER_STORE`,
      storage: createJSONStorage(() => AsyncStorage),
      partialize: ({ actions, ...rest }) => rest,
      version: 1,
    }
  )
);
