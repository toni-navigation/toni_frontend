import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { PhotonFeature } from '@/services/api-photon';

export type PointType = PhotonFeature | null | undefined;
type TripState = {
  origin: PointType;
  destination: PointType;

  actions: {
    resetTripStore: () => void;
    changeOrigin: (origin: PointType) => void;
    changeDestination: (destination: PointType) => void;
    switchOriginDestination: () => void;
  };
};

const defaultTripState: Omit<TripState, 'actions'> = {
  origin: null,
  destination: undefined,
};

export const useTripStore = create<TripState>()(
  persist(
    immer((set) => ({
      ...defaultTripState,
      actions: {
        resetTripStore: () =>
          set((state) => ({ ...state, ...defaultTripState })),
        changeOrigin: (origin: PointType) =>
          set((state) => {
            state.origin = origin;
          }),
        changeDestination: (destination: PointType) =>
          set((state) => {
            state.destination = destination;
          }),
        switchOriginDestination: () =>
          set((state) => {
            const { origin, destination } = state;
            state.origin = destination;
            state.destination = origin;
          }),
      },
    })),
    {
      name: `TRIP_STORE`,
      storage: createJSONStorage(() => AsyncStorage),
      partialize: ({ actions, destination, origin, ...rest }) => rest,
      version: 1,
    }
  )
);
