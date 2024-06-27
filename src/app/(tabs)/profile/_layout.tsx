import { Stack } from 'expo-router';
import React, { useContext } from 'react';
import 'react-native-reanimated';

import { themes } from '@/colors';
import { ThemeContext } from '@/components/ThemeProvider';

function ProfileLayout() {
  const { theme } = useContext(ThemeContext);

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerTitle: 'Mein Profil',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="calibration"
        options={{
          headerTitle: 'Kalibrierung',
          headerStyle: {
            backgroundColor: themes.external[`--${theme}-mode-background`],
          },
          headerTintColor: themes.external[`--${theme}-mode-primary`],
        }}
      />
    </Stack>
  );
}
export default ProfileLayout;
