import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { User } from '@/services/api-backend';

export type StoreUser = Omit<User, 'calibrationFactor'> | undefined;
export const calculateCalibration = (distanceInMeter: number, steps: number) =>
  Number((distanceInMeter / steps).toFixed(2));
type UserState = {
  calibrationFactor: number | null;
  actions: {
    addCalibration: (distanceInMeter: number | null, steps: number) => void;
    resetUserStore: () => void;
    resetCalibration: () => void;
  };
};

const defaultUserState: Omit<UserState, 'actions'> = {
  calibrationFactor: null,
};

export const useUserStore = create<UserState>()(
  persist(
    immer((set) => ({
      ...defaultUserState,
      actions: {
        addCalibration: (distanceInMeter, steps) =>
          set((state) => {
            if (distanceInMeter === null) {
              state.calibrationFactor = null;

              return;
            }
            state.calibrationFactor = calculateCalibration(
              distanceInMeter,
              steps
            );
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
