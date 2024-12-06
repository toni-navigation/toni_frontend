import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { PhotonFeature } from '@/services/api-photon';

type FavoriteState = {
  title: string;
  photonFeature?: PhotonFeature;

  actions: {
    addTitle: (title: string) => void;
    resetFavoritesStore: () => void;
    addPhotonFeature: (photonFeature: PhotonFeature | undefined) => void;
  };
};

const defaultFavoriteState: Omit<FavoriteState, 'actions'> = {
  title: '',
  photonFeature: undefined,
};

export const useFavoriteStore = create<FavoriteState>()(
  persist(
    immer((set) => ({
      ...defaultFavoriteState,
      actions: {
        addTitle: (title) =>
          set((state) => {
            state.title = title;
          }),
        addPhotonFeature: (photonFeature) =>
          set((state) => {
            state.photonFeature = photonFeature;
          }),
        resetFavoritesStore: () =>
          set((state) => ({ ...state, ...defaultFavoriteState })),
      },
    })),
    {
      name: `FAVORITES_STORE`,
      storage: createJSONStorage(() => AsyncStorage),
      partialize: ({ actions, ...rest }) => rest,
      version: 2,
    }
  )
);
