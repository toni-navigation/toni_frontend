import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import {
  CreateFavoriteDto,
  CreatePhotonFeatureDto,
  UpdateFavoriteDto,
} from '@/services/api-backend';

interface FavoriteWithCurrentLocation extends UpdateFavoriteDto {
  isCurrentLocation?: boolean;
}

type FavoriteState = {
  favorite: FavoriteWithCurrentLocation;

  actions: {
    addTitle: (title: string) => void;
    resetFavoritesStore: () => void;
    addPhotonFeature: (
      photonFeature: CreatePhotonFeatureDto | undefined
    ) => void;
    changeIsPinned: (isPinned: boolean) => void;
    changeIsCurrentLocation: (isCurrentLocation: boolean) => void;

    addFavorite: (favorite: CreateFavoriteDto) => void;
  };
};

const defaultFavoriteState: Omit<FavoriteState, 'actions'> = {
  favorite: {
    title: '',
    photonFeature: undefined,
    isPinned: false,
    isCurrentLocation: false,
  },
};

export const useFavoriteStore = create<FavoriteState>()(
  persist(
    immer((set) => ({
      ...defaultFavoriteState,
      actions: {
        addTitle: (title) =>
          set((state) => {
            if (!state.favorite) {
              state.favorite = {};
            }
            state.favorite.title = title;
          }),
        addPhotonFeature: (photonFeature) =>
          set((state) => {
            if (!state.favorite) {
              state.favorite = {};
            }
            state.favorite.photonFeature = photonFeature;
          }),
        changeIsPinned: (isPinned) =>
          set((state) => {
            if (!state.favorite) {
              state.favorite = {};
            }
            state.favorite.isPinned = isPinned;
          }),
        changeIsCurrentLocation: (isPinned) =>
          set((state) => {
            if (!state.favorite) {
              state.favorite = {};
            }
            state.favorite.isCurrentLocation = isPinned;
          }),
        addFavorite: (favorite) =>
          set((state) => {
            state.favorite = favorite;
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
