import { uuid } from 'expo-modules-core';
import { router } from 'expo-router';
import React, { useRef, useState } from 'react';
import { ScrollView, TextInput, View } from 'react-native';

import { Button } from '@/components/atoms/Button';
import { InputText } from '@/components/atoms/InputText';
import { GeocoderAutocomplete } from '@/components/organisms/GeocoderAutocomplete';
import {
  OriginDestinationType,
  useFavoriteStore,
} from '@/store/useFavoritesStore';

export function Formular() {
  const [title, setTitle] = useState('');
  const [photonData, setPhotonData] =
    useState<OriginDestinationType>(undefined);
  const ref = useRef<TextInput>(null);

  const { addFavorite } = useFavoriteStore((state) => state.actions);

  const getAddressHandler = () => {
    if (photonData && title) {
      const id = uuid.v4(); // Renamed 'uuid' to 'id'
      addFavorite(id, title, photonData);
      router.back();
    }
  };

  return (
    <>
      <ScrollView className="" keyboardShouldPersistTaps="always">
        <InputText
          className="mb-4"
          accessibilityLabel="Titel *"
          accessibilityHint="Pflichtfeld: Geben Sie einen Titel für Ihren Favoriten ein"
          placeholder="Name"
          inputMode="text"
          maxLength={300}
          value={title}
          onChange={(event) => setTitle(event.nativeEvent.text)}
          onClickDelete={() => {
            setTitle('');
            ref.current?.focus();
          }}
        />
        <GeocoderAutocomplete
          value={photonData}
          placeholder="Start eingeben"
          label="Start"
          onChange={(value) => {
            setPhotonData(value);
          }}
        />
      </ScrollView>
      <View className="mx-5 mb-8">
        <Button
          onPress={getAddressHandler}
          disabled={false}
          buttonType="primary"
        >
          Speichern
        </Button>
      </View>
    </>
  );
}
