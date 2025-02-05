import { useMutation, useQueryClient } from '@tanstack/react-query';
import { router } from 'expo-router';
import React from 'react';
import { ActivityIndicator, Alert } from 'react-native';

import { ModalWrapper } from '@/components/favorite/ModalWrapper';
import { Form } from '@/components/organisms/Form';
import { QUERY_KEYS } from '@/query-keys';
import { favoritesControllerCreateFavoriteMutation } from '@/services/api-backend/@tanstack/react-query.gen';
import { useFavoriteStore } from '@/store/useFavoriteStore';

export default function CreatePage() {
  const favorite = useFavoriteStore((state) => state.favorite);
  const queryClient = useQueryClient();

  const { resetFavoritesStore } = useFavoriteStore((state) => state.actions);
  const { mutate, isPending } = useMutation({
    ...favoritesControllerCreateFavoriteMutation(),
    onSuccess: (successData) => {
      Alert.alert(`${successData.title} erfolgreich hinzugefügt.`, '', [
        {
          text: 'OK',
          onPress: async () => {
            await queryClient.invalidateQueries({
              queryKey: [QUERY_KEYS.favorites],
            });

            router.back();
            resetFavoritesStore();
          },
        },
      ]);
    },
    onError: (error) => {
      Alert.alert(error.message);
    },
  });
  const addFavorite = () => {
    if (!favorite.title || !favorite.photonFeature) {
      console.error('Title and photonFeature are required');

      return;
    }

    mutate({
      body: {
        title: favorite.title,
        isPinned: favorite.isPinned ?? false,
        photonFeature: favorite.photonFeature,
        destinationType: 'normal',
      },
    });
  };

  return (
    <ModalWrapper title="Favorit hinzufügen">
      {isPending ? (
        <ActivityIndicator size="large" />
      ) : (
        <Form onSave={addFavorite} favorite={favorite} />
      )}
    </ModalWrapper>
  );
}
