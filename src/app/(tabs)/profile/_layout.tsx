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
        name="general-settings"
        options={{
          headerTitle: 'Allgemeine Einstellungen',
          headerStyle: {
            backgroundColor:
              themes.external[`--${theme}-mode-primary-inverted`],
          },
          headerTintColor: themes.external[`--${theme}-mode-primary`],
        }}
      />
      <Stack.Screen
        name="account-settings"
        options={{
          headerTitle: 'Allgemeine Einstellungen',
          headerStyle: {
            backgroundColor:
              themes.external[`--${theme}-mode-primary-inverted`],
          },
          headerTintColor: themes.external[`--${theme}-mode-primary`],
        }}
      />
      <Stack.Screen
        name="calibration/index"
        options={{
          headerTitle: 'Kalibrierung',
          headerStyle: {
            backgroundColor: themes.external[`--${theme}-mode-background`],
          },
          headerTintColor: themes.external[`--${theme}-mode-primary`],
        }}
      />
      <Stack.Screen
        name="calibration/finished"
        options={{
          headerTitle: 'Kalibrierung abgeschlossen',
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
