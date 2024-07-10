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
        name="trip"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
export default HomeLayout;
