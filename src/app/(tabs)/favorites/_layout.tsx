import { Stack } from 'expo-router';
import 'react-native-reanimated';
import React, { useContext } from 'react';

import { themes } from '@/colors';
import { ThemeContext } from '@/components/ThemeProvider';

function FavoritesLayout() {
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
        name="create"
        options={{
          headerShown: true,
          headerTitle: '',
          gestureEnabled: true,
          headerBackTitleStyle: { fontFamily: 'atkinsonRegular' },
          headerTintColor: themes.external[`--${theme}-mode-primary`],
        }}
      />
      <Stack.Screen
        name="[id]"
        options={{
          headerShown: true,
          headerTitle: '',
          headerBackTitleStyle: { fontFamily: 'atkinsonRegular' },
          headerTintColor: themes.external[`--${theme}-mode-primary`],
        }}
      />
      <Stack.Screen
        name="location-modal"
        options={{
          headerShown: false,
          presentation: 'modal',
          gestureEnabled: true,
        }}
      />
    </Stack>
  );
}
export default FavoritesLayout;
