import AsyncStorage from '@react-native-async-storage/async-storage';
import { produce } from 'immer';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { PhotonFeature } from '@/services/api-photon';

type TripState = {
  origin: PhotonFeature | undefined;
  destination: PhotonFeature | undefined;

  actions: {
    resetTripStore: () => void;
    changeOrigin: (origin: PhotonFeature) => void;
    changeDestination: (destination: PhotonFeature) => void;
  };
};

const defaultTripState: Omit<TripState, 'actions'> = {
  origin: undefined,
  destination: undefined,
};

export const useTripStore = create<TripState>()(
  persist(
    immer((set) => ({
      ...defaultTripState,
      actions: {
        resetTripStore: () =>
          set((state) => ({ ...state, ...defaultTripState })),
        changeOrigin: (origin: PhotonFeature) =>
          set((state) => {
            state.origin = origin;
          }),
        changeDestination: (destination: PhotonFeature) =>
          set((state) => {
            state.destination = destination;
          }),
      },
    })),
    {
      name: `TRIP_STORE`,
      storage: createJSONStorage(() => AsyncStorage),
      partialize: ({ actions, destination, ...rest }) => rest,
      version: 1,
    }
  )
);
