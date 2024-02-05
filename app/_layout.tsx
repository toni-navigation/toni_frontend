import { Stack } from 'expo-router';
import React from 'react';

export default function StackLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false,
        }}
      />
      {/*<Stack.Screen name={'trip'} options={{ presentation: 'modal' }} />*/}
    </Stack>
  );
}
