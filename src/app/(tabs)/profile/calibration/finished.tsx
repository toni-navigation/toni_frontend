import { useMutation } from '@tanstack/react-query';
import { router } from 'expo-router';
import React from 'react';
import { Alert, SafeAreaView, Text, View } from 'react-native';

import { Button } from '@/components/atoms/Button';
import { Header } from '@/components/atoms/Header';
import { CalibrationNavigation } from '@/components/calibration/CalibrationNavigation';
import { usersControllerUpdateUserMutation } from '@/services/api-backend/@tanstack/react-query.gen';
import { useUserStore } from '@/store/useUserStore';

export function Finished() {
  const calibrationFactor = useUserStore((state) => state.calibrationFactor);
  const user = useUserStore((state) => state.user);
  const { mutate: updateUser, isPending } = useMutation({
    ...usersControllerUpdateUserMutation(),
    onSuccess: (successData) => {},
    onError: (error) => {
      Alert.alert(error.message);
    },
  });
  const clickFinishedHandler = () => {
    if (user) {
      updateUser({
        path: { userId: user.id },
        body: {
          calibrationFactor,
        },
      });
    }
    router.navigate('/profile');
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
              {calibrationFactor} m
            </Text>
          </View>
        )}
      </View>
      <CalibrationNavigation>
        <Button
          width="full"
          buttonType="accent"
          disabled={isPending}
          onPress={clickFinishedHandler}
        >
          {isPending ? 'Lädt...' : 'Fertig'}
        </Button>
      </CalibrationNavigation>
    </SafeAreaView>
  );
}

export default Finished;
