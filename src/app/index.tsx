import { useSuspenseQuery } from '@tanstack/react-query';
import * as Location from 'expo-location';
import { Redirect } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import React, { Suspense, useEffect } from 'react';
import { ActivityIndicator, Linking, Text } from 'react-native';

import { Intro } from '@/components/Intro';
import { useCurrentLocationStore } from '@/store/useCurrentLocationStore';

export default function Index() {
  const { updateCurrentLocation } = useCurrentLocationStore(
    (state) => state.actions
  );
  const currentLocation = useCurrentLocationStore(
    (state) => state.currentLocation
  );
  const { data: accessTokenData, error } = useSuspenseQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const accessToken = await SecureStore.getItemAsync('access_token');

      return accessToken;
    },
  });

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
      {accessTokenData ? <Redirect href="/home" /> : <Intro />}
    </Suspense>
  );

  // return <Redirect href="/home" />;
}
