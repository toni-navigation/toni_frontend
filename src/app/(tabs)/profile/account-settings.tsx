import { router } from 'expo-router';
import React from 'react';
import { ScrollView, Text, View } from 'react-native';

import { Button } from '@/components/atoms/Button';
import { InputText } from '@/components/atoms/InputText';
import { ToniProfilePicture } from '@/components/atoms/icons/ToniProfilePicture';
import { ModalWrapper } from '@/components/favorite/ModalWrapper';
import { useUserStore } from '@/store/useUserStore';

export default function AccountSettings() {
  const user = useUserStore((state) => state.user);

  return (
    <ModalWrapper title="Konto bearbeiten">
      <View className="px-8 py-5 items-center">
        <ToniProfilePicture height={70} width={70} />
      </View>
      <ScrollView>
        <InputText
          placeholder="Email Adresse eingeben"
          accessibilityLabel="Email Adresse"
          accessibilityHint="Email Adresse eingeben"
          value={user?.email ? `${user.email}` : undefined}
        />
        <InputText
          placeholder="Passwort eingeben"
          accessibilityLabel="Passwort"
          accessibilityHint="Passwort eingeben"
          // value={user?.password ? `********` : undefined}
        />
        <Text
          className="underline text-medium font-generalSansSemi text-primary mt-5"
          onPress={() => {}}
        >
          Konto löschen
        </Text>
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
