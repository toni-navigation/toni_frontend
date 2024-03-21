import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

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
    (set) => ({
      ...defaultTripState,
      actions: {
        resetTripStore: () => set(defaultTripState),
        changeOrigin: (origin: PhotonFeature) => set({ origin }),
        changeDestination: (destination: PhotonFeature) => set({ destination }),
      },
    }),
    {
      name: `TRIP_STORE`,
      storage: createJSONStorage(() => AsyncStorage),
      partialize: ({ actions, ...rest }) => rest,
      version: 1,
    }
  )
);

export const invalidateTripStore = () => useTripStore.persist.clearStorage();
