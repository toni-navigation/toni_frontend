import { AtkinsonHyperlegible_400Regular } from '@expo-google-fonts/atkinson-hyperlegible';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect, useState } from 'react';

import generalSansSemi from '@/assets/fonts/GeneralSans-Semibold.otf';

SplashScreen.preventAutoHideAsync();

export default function StackLayout() {
  const [queryClient] = useState(() => new QueryClient());

  const [fontsLoaded, fontError] = useFonts({
    atkinsonRegular: AtkinsonHyperlegible_400Regular,
    generalSansSemi,
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <Stack
          screenOptions={{
            headerTitleStyle: {
              fontFamily: 'generalSansSemi',
              fontWeight: 'bold',
            },

            headerShown: false,
            // eslint-disable-next-line react/jsx-no-undef
            headerBackVisible: false, // TODO: set to false when back button is implemented
          }}
        >
          <Stack.Screen
            name="trip"
            options={{
              headerShown: false,
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
