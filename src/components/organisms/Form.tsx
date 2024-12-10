import { router } from 'expo-router';
import React, { useRef, useState } from 'react';
import { ScrollView, TextInput, View } from 'react-native';

import { Button } from '@/components/atoms/Button';
import { InputText } from '@/components/atoms/InputText';
import { GeocoderAutocomplete } from '@/components/organisms/GeocoderAutocomplete';
import {
  CreateFavoriteDto,
  CreatePhotonFeatureDto,
} from '@/services/api-backend';

interface FormProps {
  onSave: (data: CreateFavoriteDto) => void;
  initialTitle?: string;
  initialPhotonFeature?: CreatePhotonFeatureDto;
}
export function Form({
  onSave,
  initialTitle = '',
  initialPhotonFeature,
}: FormProps) {
  const [title, setTitle] = useState(initialTitle);
  const [photonFeature, setPhotonFeature] = useState(initialPhotonFeature);

  const ref = useRef<TextInput>(null);
  const handleSave = () => {
    if (!title || !photonFeature) {
      console.error('Title and photonFeature are required');

      return;
    }

    let changes: CreateFavoriteDto | Partial<CreateFavoriteDto>;

    if (initialTitle === undefined && initialPhotonFeature === undefined) {
      changes = {
        title,
        photonFeature,
        destinationType: 'normal',
      };
    } else {
      changes = {};
      if (title !== initialTitle) {
        changes.title = title;
      }
      if (photonFeature !== initialPhotonFeature) {
        changes.photonFeature = photonFeature;
      }
      changes.destinationType = 'normal';
    }

    onSave(changes as CreateFavoriteDto);
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
          autoFocus
          value={title}
          onChange={(event) => setTitle(event.nativeEvent.text)}
          onClickDelete={() => {
            setTitle('');
            ref.current?.focus();
          }}
        />

        <GeocoderAutocomplete
          value={photonFeature}
          placeholder="Adresse eingeben"
          label="Adresse *"
          onChange={(value) => {
            setPhotonFeature(value);
          }}
        />
      </ScrollView>
      <View className="pt-2 flex-row justify-between">
        <Button
          width="half"
          onPress={() => {
            router.replace('/favorites');
          }}
          buttonType="primaryOutline"
        >
          Abbrechen
        </Button>
        <Button
          width="half"
          onPress={handleSave}
          disabled={!photonFeature || !title}
          buttonType="accent"
        >
          Speichern
        </Button>
      </View>
    </>
  );
}
