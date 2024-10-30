import { Stack } from 'expo-router';
import 'react-native-reanimated';
import React, { useContext } from 'react';

import { themes } from '@/colors';
import { ThemeContext } from '@/components/ThemeProvider';

function TripLayout() {
  const { theme } = useContext(ThemeContext);

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerTitle: 'Trip',
          headerShown: false,
          headerTintColor: themes.external[`--${theme}-mode-primary`],
        }}
      />
    </Stack>
  );
}
export default TripLayout;
