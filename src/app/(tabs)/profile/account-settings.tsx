import { useMutation, useQueryClient } from '@tanstack/react-query';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';

import { Button } from '@/components/atoms/Button';
import { InputText } from '@/components/atoms/InputText';
import { ToniProfilePicture } from '@/components/atoms/icons/ToniProfilePicture';
import { ModalWrapper } from '@/components/favorite/ModalWrapper';
import { QUERY_KEYS } from '@/query-keys';
import {
  usersControllerDeleteUserMutation,
  usersControllerUpdateUserMutation,
} from '@/services/api-backend/@tanstack/react-query.gen';
import { TOKEN } from '@/services/client';
import { deleteToken } from '@/store/secureStore';
import { useAuthStore } from '@/store/useAuthStore';

type ParamsProps = {
  email: string | undefined;
  userId: string | undefined;
};
export default function AccountSettings() {
  const params = useLocalSearchParams() as ParamsProps;
  const [email, setEmail] = useState(params.email);
  const queryClient = useQueryClient();
  const { removeToken } = useAuthStore((state) => state.actions);
  const { mutate: updateUser, error } = useMutation({
    ...usersControllerUpdateUserMutation(),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.user],
      });
      router.back();
    },
  });

  const { mutate: deleteUser, error: errorDelete } = useMutation({
    ...usersControllerDeleteUserMutation(),
    onSuccess: async () => {
      await deleteToken(TOKEN);
      removeToken();
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.user],
      });
      router.back();
    },
  });

  const saveSettings = () => {
    if (email && params.userId && params.email !== email) {
      updateUser({
        body: {
          email,
        },
        path: { userId: params.userId },
      });
    }
  };

  const deleteAccount = () => {
    if (params.userId) {
      deleteUser({
        path: { userId: params.userId },
      });
    }
  };

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
          value={email}
          onChange={(event) => setEmail(event.nativeEvent.text)}
        />
        <InputText
          placeholder="Passwort eingeben"
          accessibilityLabel="Passwort"
          accessibilityHint="Passwort eingeben"
          value="********"
        />
        <Text
          className="underline text-medium font-generalSansSemi text-primary mt-5"
          onPress={deleteAccount}
        >
          Konto löschen
        </Text>
      </ScrollView>
      {error && (
        <Text className="mb-5 text-small text-center font-generalSansSemi text-accent">
          Es ist leider etwas schiefgelaufen!
        </Text>
      )}
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
        <Button width="half" onPress={saveSettings} buttonType="accent">
          Speichern
        </Button>
      </View>
    </ModalWrapper>
  );
}
