import { useMutation } from '@tanstack/react-query';
import { router } from 'expo-router';
import React from 'react';
import { Alert } from 'react-native';

import { FavoriteWrapper } from '@/components/favorite/FavoriteWrapper';
import { Form } from '@/components/organisms/Form';
import { CreateFavoriteDto } from '@/services/api-backend';
import { favoritesControllerCreateFavoriteMutation } from '@/services/api-backend/@tanstack/react-query.gen';

export default function CreatePage() {
  const { mutate } = useMutation({
    ...favoritesControllerCreateFavoriteMutation(),
    onSuccess: (successData) => {
      Alert.alert(`${successData.title} erfolgreich hinzugefügt.`, '', [
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
  const addFavorite = (body: CreateFavoriteDto) => {
    mutate({
      body,
    });
  };

  return (
    <FavoriteWrapper title="Favorit hinzufügen">
      <Form onSave={addFavorite} />
    </FavoriteWrapper>
  );
}
