import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import {
  CreateFavoriteDto,
  CreatePhotonFeatureDto,
  UpdateFavoriteDto,
} from '@/services/api-backend';

type FavoriteState = {
  favorite: UpdateFavoriteDto;

  actions: {
    addTitle: (title: string) => void;
    resetFavoritesStore: () => void;
    addPhotonFeature: (
      photonFeature: CreatePhotonFeatureDto | undefined
    ) => void;
    changeIsPinned: (isPinned: boolean) => void;
    addFavorite: (favorite: CreateFavoriteDto) => void;
  };
};

const defaultFavoriteState: Omit<FavoriteState, 'actions'> = {
  favorite: {
    title: '',
    photonFeature: undefined,
    isPinned: false,
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
              state.favorite = {}; // Initialize if undefined
            }
            state.favorite.title = title; // Update title
          }),
        addPhotonFeature: (photonFeature) =>
          set((state) => {
            if (!state.favorite) {
              state.favorite = {}; // Initialize if undefined
            }
            state.favorite.photonFeature = photonFeature; // Update photonFeature
          }),
        changeIsPinned: (isPinned) =>
          set((state) => {
            if (!state.favorite) {
              state.favorite = {}; // Initialize if undefined
            }
            state.favorite.isPinned = isPinned; // Update isPinned
          }),
        addFavorite: (favorite) =>
          set((state) => {
            state.favorite = favorite; // Replace the entire favorite object
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
