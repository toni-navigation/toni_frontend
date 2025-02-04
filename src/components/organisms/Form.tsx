import Checkbox from 'expo-checkbox';
import { router } from 'expo-router';
import React, { useContext, useRef } from 'react';
import { ScrollView, Text, TextInput, View } from 'react-native';

import { themes } from '@/colors';
import { ThemeContext } from '@/components/ThemeProvider';
import { Button } from '@/components/atoms/Button';
import { InputButton } from '@/components/atoms/InputButton';
import { InputText } from '@/components/atoms/InputText';
import { photonValue } from '@/functions/photonValue';
import { UpdateFavoriteDto } from '@/services/api-backend';
import { useFavoriteStore } from '@/store/useFavoriteStore';

interface FormProps {
  onSave: () => void;
  onDelete?: () => void;
  favorite: UpdateFavoriteDto;
  existingFavorite?: boolean;
}
export function Form({
  onSave,
  favorite,
  existingFavorite,
  onDelete,
}: FormProps) {
  const { addTitle, changeIsPinned } = useFavoriteStore(
    (state) => state.actions
  );
  const ref = useRef<TextInput>(null);
  const { theme } = useContext(ThemeContext);

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
          value={favorite?.title ?? ''}
          onChange={(event) => addTitle(event.nativeEvent.text)}
          onClickDelete={() => {
            addTitle('');
            ref.current?.focus();
          }}
        />
        <InputButton
          onPress={() => {
            router.push('/favorites/location-modal');
          }}
          label="Adresse"
        >
          {favorite?.photonFeature
            ? photonValue(favorite.photonFeature)
            : 'Standort hinzufügen'}
        </InputButton>
        <View className="flex-1 flex-row items-center justify-center">
          <Checkbox
            value={favorite?.isPinned ?? false}
            onValueChange={changeIsPinned}
            color={
              favorite?.isPinned
                ? `${themes.external[`--${theme}-mode-primary`]}`
                : undefined
            }
            className="mr-2 border-primary"
          />
          <Text className="text-textColor">Angepinnt am Homescreen</Text>
        </View>
      </ScrollView>
      <View className="pt-2 flex-row justify-center gap-1.5">
        {existingFavorite && onDelete && (
          <Button width="half" onPress={onDelete} buttonType="primaryOutline">
            Löschen
          </Button>
        )}
        <Button
          width="half"
          onPress={onSave}
          disabled={!favorite?.photonFeature || !favorite?.title}
          buttonType="accent"
        >
          Speichern
        </Button>
      </View>
    </>
  );
}
