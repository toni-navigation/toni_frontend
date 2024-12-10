import { useMutation, useSuspenseQuery } from '@tanstack/react-query';
import { router, useLocalSearchParams } from 'expo-router';
import React, { Suspense } from 'react';
import { ActivityIndicator, Alert } from 'react-native';

import { FavoriteWrapper } from '@/components/favorite/FavoriteWrapper';
import { Form } from '@/components/organisms/Form';
import { UpdateFavoriteDto } from '@/services/api-backend';
import {
  favoritesControllerFindFavoriteByIdOptions,
  favoritesControllerUpdateFavoriteMutation,
} from '@/services/api-backend/@tanstack/react-query.gen';

export default function FavoritePage() {
  const { id: favoriteId } = useLocalSearchParams<{ id: string }>();
  const { data: favorite } = useSuspenseQuery({
    ...favoritesControllerFindFavoriteByIdOptions({
      path: { favoriteId },
    }),
    queryKey: ['favorites', favoriteId],
  });

  const { mutate } = useMutation({
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

  const changeFavorite = (body: UpdateFavoriteDto) => {
    mutate({
      body,
      path: { favoriteId },
    });
  };

  return (
    <FavoriteWrapper title="Favorit bearbeiten">
      <Suspense fallback={<ActivityIndicator size="large" />}>
        <Form
          onSave={changeFavorite}
          initialTitle={favorite.title}
          initialPhotonFeature={favorite.photonFeature}
        />
      </Suspense>
    </FavoriteWrapper>
  );
}
