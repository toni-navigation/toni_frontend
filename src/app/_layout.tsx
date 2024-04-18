import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { atkinsonBold } from '@/assets/fonts/Atkinson-Hyperlegible-Bold.ttf';
import atkinsonRegular from '@/assets/fonts/Atkinson-Hyperlegible-Regular.ttf';
import generalSansSemi from '@/assets/fonts/GeneralSans-Semibold.otf';

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default function StackLayout() {
  const [queryClient] = useState(() => new QueryClient());

  const [fontsLoaded] = useFonts({
    atkinsonRegular,
    atkinsonBold,
    generalSansSemi,
  });

  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
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
