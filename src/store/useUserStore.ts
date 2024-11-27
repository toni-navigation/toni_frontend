import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { User } from '@/services/api-backend';

export type StoreUser = Omit<User, 'calibrationFactor'> | undefined;

type CalibrationState = {
  user: StoreUser;
  calibrationFactor: number | null;
  actions: {
    addCalibration: (distanceInMeter: number, steps: number) => void;
    resetCalibrationStore: () => void;
    addUser: (user: StoreUser) => void;
  };
};

const defaultCalibrationState: Omit<CalibrationState, 'actions'> = {
  user: undefined,
  calibrationFactor: null,
};

export const useUserStore = create<CalibrationState>()(
  persist(
    immer((set) => ({
      ...defaultCalibrationState,
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
        resetCalibrationStore: () =>
          set((state) => ({ ...state, ...defaultCalibrationState })),
      },
    })),
    {
      name: `CALIBRATION_STORE`,
      storage: createJSONStorage(() => AsyncStorage),
      partialize: ({ actions, ...rest }) => rest,
      version: 1,
    }
  )
);
