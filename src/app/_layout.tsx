import { AtkinsonHyperlegible_400Regular } from '@expo-google-fonts/atkinson-hyperlegible';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from 'react-native';

import generalSansSemi from '@/assets/fonts/GeneralSans-Semibold.otf';

import { ThemeProvider } from '@react-navigation/native';

import { DarkTheme, DefaultTheme } from '@/stylings';

SplashScreen.preventAutoHideAsync();
const queryClient = new QueryClient();

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider
          value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
        >
          <Stack
            screenOptions={{
              headerTitleStyle: {
                fontFamily: 'generalSansSemi',
                fontWeight: 'bold',
              },

              headerShown: false,
              // eslint-disable-next-line react/jsx-no-undef
              // headerBackVisible: false, // TODO: set to false when back button is implemented
            }}
          >
            <Stack.Screen
              name="(tabs)"
              options={{
                headerShown: false,
              }}
            />
          </Stack>
        </ThemeProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
}
export default function RootLayout() {
  const [loaded, error] = useFonts({
    atkinsonRegular: AtkinsonHyperlegible_400Regular,
    generalSansSemi,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}
