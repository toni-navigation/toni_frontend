import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { PhotonFeature } from '@/services/api-photon';
import { FavoriteProps } from '@/types/Types';

export type OriginDestinationType = PhotonFeature | undefined | null;

type FavoriteState = {
  favorites: FavoriteProps[];

  actions: {
    addFavorite: (title: string, address: OriginDestinationType) => void;
    resetFavoritesStore: () => void;
    updateFavoriteItem: (
      title: string,
      newTitle: string,
      newAddress: OriginDestinationType
    ) => void;
  };
};

const defaultFavoriteState: Omit<FavoriteState, 'actions'> = {
  favorites: [],
};

export const useFavoriteStore = create<FavoriteState>()(
  persist(
    immer((set) => ({
      ...defaultFavoriteState,
      actions: {
        addFavorite: (title, address) =>
          set((state) => {
            if (address) {
              state.favorites.push({ title, address });
            }
          }),
        updateFavoriteItem: (
          title: string,
          newTitle: string,
          newAddress: OriginDestinationType
        ) =>
          set((state) => ({
            favorites: state.favorites.map((item) =>
              item.title === title
                ? { ...item, address: newAddress, title: newTitle }
                : item
            ),
          })),
        resetFavoritesStore: () =>
          set((state) => ({ ...state, ...defaultFavoriteState })),
      },
    })),
    {
      name: `FAVORITES_STORE`,
      storage: createJSONStorage(() => AsyncStorage),
      partialize: ({ actions, ...rest }) => rest,
      version: 1,
    }
  )
);
