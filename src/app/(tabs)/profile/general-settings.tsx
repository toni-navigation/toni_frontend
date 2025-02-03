import { useMutation, useQuery } from '@tanstack/react-query';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, ScrollView, View } from 'react-native';

import { themes } from '@/colors';
import { Button } from '@/components/atoms/Button';
import { InputButton } from '@/components/atoms/InputButton';
import { InputText } from '@/components/atoms/InputText';
import { ToniLocation } from '@/components/atoms/icons/ToniLocation';
import { ToniProfilePicture } from '@/components/atoms/icons/ToniProfilePicture';
import { ModalWrapper } from '@/components/favorite/ModalWrapper';
import { GeocoderAutocomplete } from '@/components/organisms/GeocoderAutocomplete';
import { inputButtonOutput } from '@/functions/originOutput';
import {
  favoritesControllerCreateFavoriteMutation,
  favoritesControllerFindAllFavoritesOptions,
  usersControllerUpdateUserMutation,
} from '@/services/api-backend/@tanstack/react-query.gen';
import { useAuthStore } from '@/store/useAuthStore';
import { useUserStore } from '@/store/useUserStore';

export default function GeneralSettings() {
  const user = useUserStore((state) => state.user);

  const { changeFirstName, changeLastName } = useUserStore(
    (state) => state.actions
  );

  const { mutateAsync: updateUser } = useMutation({
    ...usersControllerUpdateUserMutation(),
    onSuccess: (successData) => {},
    onError: (errorUser) => {
      Alert.alert(errorUser.message);
    },
  });

  const saveUserUpdate = () => {
    if (user) {
      updateUser({
        path: { userId: user.id },
        body: {
          firstname: user.firstname ?? '',
          lastname: user.lastname ?? '',
        },
      });
      // if (home)
      //   updateHome({
      //     body: {
      //       title: 'Heimatadresse',
      //       isPinned: true,
      //       photonFeature: home?.photonFeature,
      //       destinationType: 'home',
      //     },
      //   });
    }
    router.navigate('/profile');
  };

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
          value={user?.firstname ? `${user.firstname}` : ''}
          onChange={(event) => changeFirstName(event.nativeEvent.text)}
        />
        <InputText
          placeholder="Nachname eingeben"
          accessibilityLabel="Nachname"
          accessibilityHint="Nachname eingeben"
          value={user?.lastname ? `${user.lastname}` : ''}
          onChange={(event) => changeLastName(event.nativeEvent.text)}
        />
        <InputButton
          classes=""
          onPress={() => {
            router.push('/profile/home-address');
          }}
          label="Heimatadresse"
        >
          {inputButtonOutput(home?.photonFeature)}
        </InputButton>
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
        <Button width="half" onPress={saveUserUpdate} buttonType="accent">
          Speichern
        </Button>
      </View>
    </ModalWrapper>
  );
}
