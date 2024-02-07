import { Stack } from 'expo-router';
import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export default function StackLayout() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Stack>
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
          }}
        />
        {/*<Stack.Screen name={'trip'} options={{ presentation: 'modal' }} />*/}
      </Stack>
    </QueryClientProvider>
  );
}
