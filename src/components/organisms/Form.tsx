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

interface FormProps {
  id: string | undefined;
  title: string | undefined;
  address: OriginDestinationType;
}

export function Form({ id, title, address }: FormProps) {
  const [titleValue, setTitleValue] = useState(title ?? '');
  const [photonData, setPhotonData] = useState<OriginDestinationType>(address);
  const ref = useRef<TextInput>(null);

  const { addFavorite, updateFavoriteItem } = useFavoriteStore(
    (state) => state.actions
  );

  const getAddressHandler = () => {
    if (!id) {
      addFavorite(uuid.v4(), titleValue, photonData);
    } else {
      updateFavoriteItem(id, titleValue, photonData);
    }

    router.back();
  };
  console.log(photonData);

  return (
    <>
      <ScrollView className="" keyboardShouldPersistTaps="always">
        <InputText
          className="mb-4"
          accessibilityLabel="Titel *"
          accessibilityHint="Pflichtfeld: Geben Sie einen Titel für Ihren Favoriten ein"
          placeholder="Name eingeben"
          inputMode="text"
          maxLength={300}
          value={titleValue}
          onChange={(event) => setTitleValue(event.nativeEvent.text)}
          onClickDelete={() => {
            setTitleValue('');
            ref.current?.focus();
          }}
        />
        <GeocoderAutocomplete
          value={photonData}
          placeholder="Adresse eingeben"
          label="Adresse *"
          onChange={(value) => {
            setPhotonData(value);
          }}
        />
      </ScrollView>
      <View className="my-8">
        <Button
          width="full"
          onPress={getAddressHandler}
          disabled={!photonData || !titleValue}
          buttonType="primary"
        >
          Speichern
        </Button>
      </View>
    </>
  );
}
