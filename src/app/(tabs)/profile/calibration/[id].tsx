import { Stack, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Text } from 'react-native';

import { Calibration } from '@/components/calibration/Calibration';

export default function CalibrationPage() {
  const { id } = useLocalSearchParams();

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: 'Kalibrierung',
          headerBackTitle: 'Zurück',
        }}
      />
      <Calibration id={Number(id)} />
    </>
  );
}
