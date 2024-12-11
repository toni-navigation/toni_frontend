import { useMutation, useSuspenseQuery } from '@tanstack/react-query';
import { router, useLocalSearchParams } from 'expo-router';
import React, { Suspense } from 'react';
import { ActivityIndicator, Alert } from 'react-native';

import { FavoriteWrapper } from '@/components/favorite/FavoriteWrapper';
import { Form } from '@/components/organisms/Form';
import { UpdateFavoriteDto } from '@/services/api-backend';
import {
  favoritesControllerDeleteFavoriteMutation,
  favoritesControllerFindFavoriteByIdOptions,
  favoritesControllerUpdateFavoriteMutation,
} from '@/services/api-backend/@tanstack/react-query.gen';
import { useFavoriteStore } from '@/store/useFavoriteStore';

export default function FavoritePage() {
  const favorite = useFavoriteStore((state) => state.favorite);

  const { id: favoriteId } = useLocalSearchParams<{ id: string }>();
  const { data } = useSuspenseQuery({
    ...favoritesControllerFindFavoriteByIdOptions({
      path: { favoriteId },
    }),
    queryKey: ['favorites', favoriteId],
  });

  const { mutate: updateFavorite } = useMutation({
    ...favoritesControllerUpdateFavoriteMutation(),
    onSuccess: (successData) => {
      Alert.alert(`${successData.title} erfolgreich bearbeitet.`, '', [
        {
          text: 'OK',
          onPress: () => {
            router.replace('/favorites');
          },
        },
      ]);
    },
    onError: (error) => {
      Alert.alert(error.message);
    },
  });
  const { mutate: deleteFavorite } = useMutation({
    ...favoritesControllerDeleteFavoriteMutation({
      path: { favoriteId },
    }),
    onSuccess: (successData) => {
      Alert.alert(`${successData.title} erfolgreich gelöscht.`, '', [
        {
          text: 'OK',
          onPress: () => {
            router.replace('/favorites');
          },
        },
      ]);
    },
    onError: (error) => {
      Alert.alert(error.message);
    },
  });

  const deleteHandler = () => {
    deleteFavorite({ path: { favoriteId } });
  };

  const changeFavorite = () => {
    const updatedFields: Partial<UpdateFavoriteDto> = {};
    if (favorite.title !== data.title) updatedFields.title = favorite.title;
    if (favorite.isPinned !== data.isPinned)
      updatedFields.isPinned = favorite.isPinned;
    if (
      favorite.photonFeature?.geometry.coordinates[0] !==
        data.photonFeature.geometry.coordinates[0] ||
      favorite.photonFeature?.geometry.coordinates[1] !==
        data.photonFeature.geometry.coordinates[1]
    )
      updatedFields.photonFeature = favorite.photonFeature;

    updateFavorite({
      body: updatedFields,
      path: { favoriteId },
    });
  };

  return (
    <FavoriteWrapper title="Favorit bearbeiten">
      <Suspense fallback={<ActivityIndicator size="large" />}>
        <Form
          onDelete={deleteHandler}
          onSave={changeFavorite}
          favorite={favorite}
          existingFavorite={!!data}
        />
      </Suspense>
    </FavoriteWrapper>
  );
}
