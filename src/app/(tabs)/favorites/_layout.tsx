import { Stack } from 'expo-router';
import 'react-native-reanimated';
import React from 'react';

function FavoritesLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerTitle: 'Meine Favoriten',
          headerShown: false,
        }}
      />
      <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
    </Stack>
  );
}
export default FavoritesLayout;
