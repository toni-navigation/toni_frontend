import { Stack, useLocalSearchParams } from 'expo-router';

import { Calibration } from '@/components/calibration/Calibration';

export default function CalibrationPage() {
  const { id } = useLocalSearchParams();

  return (
    <>
      <Stack.Screen
        // name="[id]"
        options={{
          headerTitle: `Schritt ${Number(id) + 1}`,
          // headerShown: false,
          animation: 'none',
          headerBackTitle: 'Zurück',
        }}
      />
      <Calibration id={Number(id)} />
    </>
  );
}
