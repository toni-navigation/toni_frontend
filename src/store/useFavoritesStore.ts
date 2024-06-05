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
    addFavorite: (
      id: string,
      title: string,
      address: OriginDestinationType
    ) => void;
    deleteFavorite: (id: string) => void;
    resetFavoritesStore: () => void;
    updateFavoriteItem: (
      id: string,
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
        addFavorite: (id, title, address) =>
          set((state) => {
            if (address) {
              state.favorites.push({ id, title, address });
            }
          }),
        deleteFavorite: (id) =>
          set((state) => {
            if (id) {
              state.favorites = state.favorites.filter(
                (favorite) => favorite.id !== id
              );
            }
          }),
        updateFavoriteItem: (
          id: string,
          newTitle: string,
          newAddress: OriginDestinationType
        ) =>
          set((state) => ({
            favorites: state.favorites.map((item) =>
              item.id === id
                ? { ...item, title: newTitle, address: newAddress }
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
