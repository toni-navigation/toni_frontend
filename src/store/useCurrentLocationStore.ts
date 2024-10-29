import AsyncStorage from '@react-native-async-storage/async-storage';
import { LocationObject } from 'expo-location';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

type CurrentLocationState = {
  currentLocation: LocationObject | undefined;
  actions: {
    updateCurrentLocation: (currentLocation: LocationObject) => void;
    resetCurrentLocationStore: () => void;
  };
};

const defaultCurrentLocationState: Omit<CurrentLocationState, 'actions'> = {
  currentLocation: undefined,
};

export const useCurrentLocationStore = create<CurrentLocationState>()(
  persist(
    immer((set) => ({
      ...defaultCurrentLocationState,
      actions: {
        updateCurrentLocation: (currentLocation) =>
          set((state) => {
            state.currentLocation = currentLocation;
          }),

        resetCurrentLocationStore: () =>
          set((state) => ({ ...state, ...defaultCurrentLocationState })),
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
