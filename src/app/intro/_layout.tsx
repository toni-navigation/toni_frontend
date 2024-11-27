import { Stack } from 'expo-router';
import 'react-native-reanimated';
import React, { useContext } from 'react';

import { themes } from '@/colors';
import { ThemeContext } from '@/components/ThemeProvider';

function RegistrationLayout() {
  const { theme } = useContext(ThemeContext);

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerTitle: 'Meine Favoriten',
          headerShown: false,
          headerTintColor: themes.external[`--${theme}-mode-primary`],
        }}
      />
      <Stack.Screen
        name="registration"
        options={{
          headerShown: false,
          presentation: 'modal',
          gestureEnabled: true,
        }}
      />
      <Stack.Screen
        name="login"
        options={{
          headerShown: false,
          presentation: 'modal',
          gestureEnabled: true,
        }}
      />
    </Stack>
  );
}
export default RegistrationLayout;
