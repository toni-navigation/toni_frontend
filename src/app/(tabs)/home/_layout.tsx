import { Stack } from 'expo-router';
import 'react-native-reanimated';
import React from 'react';

function HomeLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerTitle: 'Navigation',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="start"
        options={{
          headerShown: false,
          presentation: 'modal',
          gestureEnabled: true,
        }}
      />
      <Stack.Screen
        name="destination"
        options={{
          headerShown: false,
          presentation: 'modal',
          gestureEnabled: true,
        }}
      />
    </Stack>
  );
}
export default HomeLayout;
