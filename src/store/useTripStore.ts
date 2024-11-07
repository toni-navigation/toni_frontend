import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { getPhotonKey } from '@/functions/getPhotonKey';
import { PhotonFeature } from '@/services/api-photon';

export type OriginDestinationType = PhotonFeature | undefined | null;

type TripState = {
  origin: OriginDestinationType;
  destination: OriginDestinationType;
  lastDestinations: PhotonFeature[];
  actions: {
    resetTripStore: () => void;
    changeOrigin: (origin: OriginDestinationType) => void;
    changeDestination: (destination: OriginDestinationType) => void;
    switchOriginDestination: () => void;
    cleanLastDestinations: () => void;
  };
};

const defaultTripState: Omit<TripState, 'actions'> = {
  origin: null,
  destination: undefined,
  lastDestinations: [],
};

export const useTripStore = create<TripState>()(
  persist(
    immer((set) => ({
      ...defaultTripState,
      actions: {
        resetTripStore: () =>
          set((state) => ({ ...state, ...defaultTripState })),
        changeOrigin: (origin: OriginDestinationType) =>
          set((state) => {
            state.origin = origin;
          }),
        changeDestination: (destination: OriginDestinationType) =>
          set((state) => {
            state.destination = destination;
            if (destination) {
              state.lastDestinations = [
                destination,
                ...state.lastDestinations.filter(
                  (lastDestination) =>
                    getPhotonKey(lastDestination) !== getPhotonKey(destination)
                ),
              ].slice(0, 3);
            }
          }),
        switchOriginDestination: () =>
          set((state) => {
            const { origin, destination } = state;
            state.origin = destination;
            state.destination = origin;
          }),
        cleanLastDestinations: () =>
          set((state) => {
            state.lastDestinations = [];
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
