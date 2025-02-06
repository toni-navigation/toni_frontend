import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { router } from 'expo-router';
import React from 'react';
import { Alert, SafeAreaView, Text, View } from 'react-native';

import { Button } from '@/components/atoms/Button';
import { Header } from '@/components/atoms/Header';
import { CalibrationNavigation } from '@/components/calibration/CalibrationNavigation';
import { QUERY_KEYS } from '@/query-keys';
import {
  authenticationControllerGetUserOptions,
  usersControllerUpdateUserMutation,
} from '@/services/api-backend/@tanstack/react-query.gen';
import { useAuthStore } from '@/store/useAuthStore';
import { useUserStore } from '@/store/useUserStore';

export function Finished() {
  const queryClient = useQueryClient();

  const token = useAuthStore((state) => state.token);
  const calibrationFactor = useUserStore((state) => state.calibrationFactor);
  const { data: user } = useQuery({
    ...authenticationControllerGetUserOptions(),
    queryKey: [QUERY_KEYS.user, token],
    enabled: !!token,
  });
  const { mutate: updateUser, isPending } = useMutation({
    ...usersControllerUpdateUserMutation(),
    onSuccess: async (successData) => {
      await queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.user] });

      router.replace('/profile');
    },
    onError: (error) => {
      Alert.alert(error.message);
    },
  });
  const clickFinishedHandler = () => {
    if (user) {
      console.log('calibrationFactor', calibrationFactor);
      updateUser({
        path: { userId: user.id },
        body: {
          calibrationFactor,
        },
      });
    } else {
      router.replace('/home');
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-background" testID="calibrationID">
      <View className="px-8 mt-8 flex-1 flex-grow">
        <Header classes="text-textColor text-large">
          Schrittlänge konfiguriert
        </Header>
        {calibrationFactor && (
          <View>
            <Text
              testID="Mode"
              className="text-small font-atkinsonRegular mt-8 mb-2 text-textColor text-center"
            >
              Schrittlänge:
            </Text>
            <Text className="text-large font-generalSansSemi text-primary text-center">
              {calibrationFactor
                ? `${calibrationFactor} m`
                : 'Es wurde keine Schrittlänge konfiguriert.'}
            </Text>
          </View>
        )}
      </View>
      <CalibrationNavigation>
        <Button
          width="full"
          buttonType="accent"
          disabled={isPending}
          isLoading={isPending}
          onPress={clickFinishedHandler}
        >
          {isPending ? 'Lädt...' : 'Fertig'}
        </Button>
      </CalibrationNavigation>
    </SafeAreaView>
  );
}

export default Finished;
