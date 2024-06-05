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
  idProp: string | undefined;
  titleProp: string | undefined;
  addressProp: OriginDestinationType;
}

export function Form({ idProp, titleProp, addressProp }: FormProps) {
  const [title, setTitle] = useState(titleProp);
  const [photonData, setPhotonData] =
    useState<OriginDestinationType>(addressProp);
  const ref = useRef<TextInput>(null);

  const { addFavorite, updateFavoriteItem } = useFavoriteStore(
    (state) => state.actions
  );

  const getAddressHandler = () => {
    if (idProp && photonData && title) {
      updateFavoriteItem(idProp, title, photonData);
      router.back();
    } else if (photonData && title) {
      const newid = uuid.v4();
      addFavorite(newid, title, photonData);
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
          placeholder="Name eingeben"
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
          placeholder="Adresse eingeben"
          label="Adresse *"
          onChange={(value) => {
            setPhotonData(value);
          }}
        />
      </ScrollView>
      <View className="my-8">
        <Button
          onPress={getAddressHandler}
          disabled={!photonData || !title}
          buttonType="primary"
        >
          Speichern
        </Button>
      </View>
    </>
  );
}
