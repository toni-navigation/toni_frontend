import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { PhotonFeature } from '@/services/api-photon';
import { DestinationProps } from '@/types/Types';

export type OriginDestinationType = PhotonFeature | undefined | null;

type DestinationState = {
  destinations: DestinationProps[];

  actions: {
    addDestination: (key: string, address: PhotonFeature) => void;
    deleteDestination: (key: string) => void;
    resetDestinationsStore: () => void;
  };
};

const defaultDestinationState: Omit<DestinationState, 'actions'> = {
  destinations: [],
};

export const useDestinationsStore = create<DestinationState>()(
  persist(
    immer((set, get) => ({
      ...defaultDestinationState,
      actions: {
        addDestination: (key, address) =>
          set((state) => {
            const { deleteDestination } = get().actions;

            const existingDestinationIndex = state.destinations.findIndex(
              (destination) => destination.key === key
            );

            if (existingDestinationIndex !== -1) {
              deleteDestination(key);
            }

            if (state.destinations.length >= 3) {
              state.destinations.shift();
            }

            state.destinations.push({ key, address });
          }),
        deleteDestination: (key) =>
          set((state) => {
            if (key) {
              console.log('deleting destination', key);
              console.log('state.destinations', state.destinations);
              state.destinations = state.destinations.filter(
                (destination) => destination.key !== key
              );
              console.log('state.destinations', state.destinations);
            }
          }),
        resetDestinationsStore: () =>
          set((state) => ({ ...state, ...defaultDestinationState })),
      },
    })),
    {
      name: `DESTINATIONS_STORE`,
      storage: createJSONStorage(() => AsyncStorage),
      partialize: ({ actions, ...rest }) => rest,
      version: 1,
    }
  )
);
