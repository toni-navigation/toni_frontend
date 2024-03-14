import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import React, { useState } from 'react';

export default function StackLayout() {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <Stack
          screenOptions={{
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerShown: true,
            // eslint-disable-next-line react/jsx-no-undef
            headerBackVisible: false, // TODO: set to false when back button is implemented
          }}
        >
          <Stack.Screen
            name="trip"
            options={{
              headerTitle: 'Derzeitige Navigation',
            }}
          />
          <Stack.Screen
            name="calibration"
            options={{
              headerTitle: 'Kalibrierung',
            }}
          />
          <Stack.Screen
            name="(tabs)"
            options={{
              headerShown: false,
            }}
          />
          {/* <Stack.Screen name={'trip'} options={{ presentation: 'modal' }} /> */}
        </Stack>
      </QueryClientProvider>
    </React.StrictMode>
  );
}
