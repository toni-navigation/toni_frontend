import * as Location from 'expo-location';
import { Redirect } from 'expo-router';
import React, { Suspense, useEffect } from 'react';
import { ActivityIndicator, Linking, Text } from 'react-native';

import { Intro } from '@/components/Intro';
import { useAuthStore } from '@/store/useAuthStore';
import { useCurrentLocationStore } from '@/store/useCurrentLocationStore';

export default function Index() {
  const { updateCurrentLocation } = useCurrentLocationStore(
    (state) => state.actions
  );
  const currentLocation = useCurrentLocationStore(
    (state) => state.currentLocation
  );
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        await Linking.openSettings();
      }
      const watchPosition = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 1000,
          distanceInterval: 1,
        },
        (locationObject) => {
          updateCurrentLocation(locationObject);
        }
      );

      return () => watchPosition.remove();
    })();
  }, [updateCurrentLocation]);

  if (currentLocation === null || currentLocation === undefined) {
    return <Text>Loading</Text>;
  }

  return (
    <Suspense fallback={<ActivityIndicator size="large" />}>
      {isAuthenticated ? <Redirect href="/home" /> : <Intro />}
    </Suspense>
  );

  // return <Redirect href="/home" />;
}
