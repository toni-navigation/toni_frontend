import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import React from 'react';

export default function StackLayout() {
  const [queryClient] = React.useState(() => new QueryClient());

  return (
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
  );
}
