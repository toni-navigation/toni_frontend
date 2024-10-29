import { Stack } from 'expo-router';
import 'react-native-reanimated';
import React, { useContext } from 'react';

import { themes } from '@/colors';
import { ThemeContext } from '@/components/ThemeProvider';

function CalibrationLayout() {
  const { theme } = useContext(ThemeContext);

  return (
    <Stack>
      <Stack.Screen
        name="[id]"
        options={{
          headerShown: true,
          headerTitle: 'Kalibrierung',
          headerBackTitle: 'Zurück',
          headerBackTitleStyle: { fontFamily: 'atkinsonRegular' },
          headerTintColor: themes.external[`--${theme}-mode-primary`],
        }}
      />
    </Stack>
  );
}
export default CalibrationLayout;
