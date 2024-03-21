import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { CurrentLocationType } from '@/types/Types';

type CurrentLocationState = {
  currentLocation: CurrentLocationType;
  actions: {
    updateCurrentLocation: (currentLocation: CurrentLocationType) => void;
    resetCurrentLocationStore: () => void;
  };
};

const defaultCurrentLocationState: Omit<CurrentLocationState, 'actions'> = {
  currentLocation: undefined,
};

export const useCurrentLocationStore = create<CurrentLocationState>()(
  persist(
    (set) => ({
      ...defaultCurrentLocationState,
      actions: {
        updateCurrentLocation: (currentLocation) =>
          set((state) => ({ ...state, currentLocation })),

        resetCurrentLocationStore: () => set(defaultCurrentLocationState),
      },
    }),
    {
      name: `CALIBRATION_STORE`,
      storage: createJSONStorage(() => AsyncStorage),
      partialize: ({ actions, ...rest }) => rest,
      version: 1,
    }
  )
);

export const invalidateCurrentLocationStore = () =>
  useCurrentLocationStore.persist.clearStorage();
