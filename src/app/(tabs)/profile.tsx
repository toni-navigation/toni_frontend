import React from 'react';
import { SafeAreaView, ScrollView, Text, useColorScheme } from 'react-native';

import { Calibration } from '@/components/Calibration';
import { Button } from '@/components/atoms/Button';
import { Header } from '@/components/atoms/Header';
import { useCalibrationStore } from '@/store/useCalibrationStore';

export default function Page() {
  const { resetCalibrationStore } = useCalibrationStore(
    (state) => state.actions
  );
  const calibration = useCalibrationStore((state) => state.calibration);
  const colorscheme = useColorScheme();

  return (
    <SafeAreaView
      className={`flex-1 ${colorscheme === 'light' ? 'bg-background-light' : 'bg-background-dark'}`}
    >
      <ScrollView className="mx-8 my-8">
        <Header>Profil</Header>
        <Calibration />
        <Text className="text-white text-center text-lg">
          {JSON.stringify(calibration.meters)}
          {JSON.stringify(calibration.factors)}
        </Text>
        <Button
          buttonType="primaryOutline"
          disabled={false}
          onPress={() => {
            resetCalibrationStore();
          }}
        >
          Kalibrierung zurücksetzen
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
}
