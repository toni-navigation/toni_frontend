import { useMutation } from '@tanstack/react-query';
import { router } from 'expo-router';
import React from 'react';
import { Alert } from 'react-native';

import { ModalWrapper } from '@/components/favorite/ModalWrapper';
import { Form } from '@/components/organisms/Form';
import { favoritesControllerCreateFavoriteMutation } from '@/services/api-backend/@tanstack/react-query.gen';
import { useFavoriteStore } from '@/store/useFavoriteStore';

export default function CreatePage() {
  const favorite = useFavoriteStore((state) => state.favorite);

  const { resetFavoritesStore } = useFavoriteStore((state) => state.actions);
  const { mutate } = useMutation({
    ...favoritesControllerCreateFavoriteMutation(),
    onSuccess: (successData) => {
      Alert.alert(`${successData.title} erfolgreich hinzugefügt.`, '', [
        {
          text: 'OK',
          onPress: () => {
            router.replace('/favorites');
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
    console.log({
      body: {
        title: favorite.title,
        isPinned: favorite?.isPinned || false,
        photonFeature: favorite.photonFeature,
        destinationType: 'normal',
      },
    });
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
      <Form onSave={addFavorite} favorite={favorite} />
    </ModalWrapper>
  );
}
