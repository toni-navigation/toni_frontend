import Calibration from '../../src/pages/Calibration';
import { SafeAreaView, ScrollView, Text, useColorScheme } from 'react-native';
import Button from '../../src/components/atoms/Button';
import React from 'react';
import useUserStore from '../../store/useUserStore';

export default function Page() {
  const { actions, calibration } = useUserStore();

  const colorscheme = useColorScheme();

  return (
    <SafeAreaView
      className={`flex-1 ${colorscheme === 'light' ? 'bg-background-light' : 'bg-background-dark'}`}
    >
      {/* eslint-disable-next-line react/jsx-no-undef */}
      <ScrollView className="mx-5 my-5">
        <Calibration />
        <Text className="text-white text-center text-lg">
          {JSON.stringify(calibration.factors)}
        </Text>
        <Button
          buttonType={'secondary'}
          onPress={() => {
            actions.setResetCalibration();
          }}
        >
          <Text className="text-white text-center text-lg">
            Kalibrierung zurücksetzen
          </Text>
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
}
