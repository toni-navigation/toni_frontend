import { Stack, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Text } from 'react-native';

import { Calibration } from '@/components/calibration/Calibration';

export default function CalibrationPage() {
  const { id } = useLocalSearchParams();

  // return (<Calibration id={Number(id)} />)

  return (
    // <Text>CalibrationPage</Text>
    <>
      <Stack.Screen
        options={{
          // headerTitle: `Schritt ${Number(id)}`,
          headerTitle: 'Kalibrierung',
          // headerShown: false
          // animation: 'none',
          headerBackTitle: 'Zurück',
        }}
      />
      <Calibration id={Number(id)} />
    </>
  );
}
