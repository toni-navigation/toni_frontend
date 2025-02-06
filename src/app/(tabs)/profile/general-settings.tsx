import { useMutation, useQueryClient } from '@tanstack/react-query';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';

import { Button } from '@/components/atoms/Button';
import { InputText } from '@/components/atoms/InputText';
import { ToniProfilePicture } from '@/components/atoms/icons/ToniProfilePicture';
import { ModalWrapper } from '@/components/favorite/ModalWrapper';
import { QUERY_KEYS } from '@/query-keys';
import { UpdateUserDto } from '@/services/api-backend';
import { usersControllerUpdateUserMutation } from '@/services/api-backend/@tanstack/react-query.gen';

type ParamsProps = {
  userId: string | undefined;
  firstname: string | undefined;
  lastname: string | undefined;
  homeFavorite: string | undefined;
};

export default function GeneralSettings() {
  const queryClient = useQueryClient();

  const params = useLocalSearchParams() as ParamsProps;

  const [firstname, setFirstname] = useState(params?.firstname ?? '');
  const [lastname, setLastname] = useState(params?.lastname ?? '');

  const { mutate: updateUser, isPending: isPendingUser } = useMutation({
    ...usersControllerUpdateUserMutation(),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.user] });
      router.back();
    },
  });

  const saveSettings = () => {
    const userUpdates: UpdateUserDto = {};

    if (firstname !== params.firstname) {
      userUpdates.firstname = firstname;
    }
    if (lastname !== params.lastname) {
      userUpdates.lastname = lastname;
    }

    if (params.userId && Object.keys(userUpdates).length > 0) {
      updateUser({
        body: userUpdates,
        path: { userId: params.userId },
      });
    }
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
          value={firstname}
          onChange={(event) => setFirstname(event.nativeEvent.text)}
        />
        <InputText
          placeholder="Nachname eingeben"
          accessibilityLabel="Nachname"
          accessibilityHint="Nachname eingeben"
          value={lastname}
          onChange={(event) => setLastname(event.nativeEvent.text)}
        />
      </ScrollView>
      <View className="flex flex-row mb-8 gap-1.5">
        <Button
          width="half"
          onPress={() => router.back()}
          buttonType="primaryOutline"
        >
          Abbrechen
        </Button>
        <Button
          width="half"
          onPress={saveSettings}
          buttonType="accent"
          disabled={isPendingUser}
          isLoading={isPendingUser}
        >
          Speichern
        </Button>
      </View>
    </ModalWrapper>
  );
}
