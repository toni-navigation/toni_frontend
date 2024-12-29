import { router } from 'expo-router';
import React from 'react';
import { ScrollView, View } from 'react-native';

import { Button } from '@/components/atoms/Button';
import { InputText } from '@/components/atoms/InputText';
import { ToniProfilePicture } from '@/components/atoms/icons/ToniProfilePicture';
import { ModalWrapper } from '@/components/favorite/ModalWrapper';
import { GeocoderAutocomplete } from '@/components/organisms/GeocoderAutocomplete';
import { useUserStore } from '@/store/useUserStore';

export default function GeneralSettings() {
  const user = useUserStore((state) => state.user);

  return (
    <ModalWrapper title="Persönliche Daten bearbeiten">
      <View className="px-8 py-5 items-center">
        <ToniProfilePicture height={70} width={70} />
      </View>
      <ScrollView>
        <InputText
          placeholder="Vorname eingeben"
          accessibilityLabel="Vorname"
          accessibilityHint="Vorname eingeben"
          value={user?.firstname ? `${user.firstname}` : undefined}
        />
        <InputText
          placeholder="Nachname eingeben"
          accessibilityLabel="Nachname"
          accessibilityHint="Nachname eingeben"
          value={user?.lastname ? `${user.lastname}` : undefined}
        />
        <GeocoderAutocomplete
          extraSuggestions={false}
          label="Heimatadresse"
          value={undefined}
          placeholder="Heimatadresse eingeben"
          onChange={() => {}}
        />
      </ScrollView>
      <View className="flex flex-row mb-8 gap-1.5">
        <Button
          width="half"
          onPress={() => {
            router.back();
          }}
          buttonType="primaryOutline"
        >
          Abbrechen
        </Button>
        <Button width="half" onPress={() => {}} buttonType="accent">
          Speichern
        </Button>
      </View>
    </ModalWrapper>
  );
}
