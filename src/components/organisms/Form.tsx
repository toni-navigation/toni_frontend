import { useMutation } from '@tanstack/react-query';
import { router } from 'expo-router';
import React, { useRef } from 'react';
import { Alert, ScrollView, TextInput, View } from 'react-native';

import { Button } from '@/components/atoms/Button';
import { InputText } from '@/components/atoms/InputText';
import { GeocoderAutocomplete } from '@/components/organisms/GeocoderAutocomplete';
import { favoritesControllerCreateFavoriteMutation } from '@/services/api-backend/@tanstack/react-query.gen';
import { useFavoriteStore } from '@/store/useFavoriteStore';

export function Form() {
  const title = useFavoriteStore((state) => state.title);
  const photonFeature = useFavoriteStore((state) => state.photonFeature);
  const { addTitle, addPhotonFeature, resetFavoritesStore } = useFavoriteStore(
    (state) => state.actions
  );
  const ref = useRef<TextInput>(null);

  const { mutate } = useMutation({
    ...favoritesControllerCreateFavoriteMutation(),
    onSuccess: (successData) => {
      console.log('Yei');
      Alert.alert(`${successData.title} erfolgreich hinzugefügt.`, '', [
        {
          text: 'OK',
          onPress: () => {
            resetFavoritesStore();
            router.replace('/favorites');
          },
        },
      ]);
    },
    onError: (error) => {
      Alert.alert(error.message);
    },
  });
  const addFavorite = () => {
    if (!photonFeature || !title) {
      console.error('All fields are required!');

      return;
    }
    mutate({
      body: {
        title,
        destinationType: 'normal',
        photonFeature,
      },
    });
  };

  return (
    <>
      <ScrollView className="" keyboardShouldPersistTaps="always">
        <Button
          onPress={() => resetFavoritesStore()}
          buttonType="accent"
          width="full"
        >
          Clean up
        </Button>
        <InputText
          className="mb-4"
          accessibilityLabel="Titel *"
          accessibilityHint="Pflichtfeld: Geben Sie einen Titel für Ihren Favoriten ein"
          placeholder="Name eingeben"
          inputMode="text"
          maxLength={300}
          value={title}
          onChange={(event) => addTitle(event.nativeEvent.text)}
          onClickDelete={() => {
            addTitle('');
            ref.current?.focus();
          }}
        />
        <GeocoderAutocomplete
          value={photonFeature}
          placeholder="Adresse eingeben"
          label="Adresse *"
          onChange={(value) => {
            if (value === undefined) {
              addPhotonFeature(undefined);
            } else {
              addPhotonFeature(value);
            }
          }}
        />
      </ScrollView>
      <View className="my-8">
        <Button
          width="full"
          onPress={addFavorite}
          disabled={!photonFeature || !title}
          buttonType="primary"
        >
          Speichern
        </Button>
      </View>
    </>
  );
}
