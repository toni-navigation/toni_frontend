import * as Location from 'expo-location';
import React, { Suspense, useEffect } from 'react';
import { ActivityIndicator, Linking } from 'react-native';

import '@/services/client';
import { useTokenLoader } from '@/queries/useTokenLoader';
import { useAuthStore } from '@/store/useAuthStore';
import { useCurrentLocationStore } from '@/store/useCurrentLocationStore';

import { Redirect } from 'expo-router';

export default function Index() {
  const { addToken } = useAuthStore((state) => state.actions);
  const { data, isPending, isError, isSuccess } = useTokenLoader();
  if (isSuccess && data) {
    addToken(data);
  }
  const { updateCurrentLocation } = useCurrentLocationStore(
    (state) => state.actions
  );
  const currentLocation = useCurrentLocationStore(
    (state) => state.currentLocation
  );
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
          console.log(locationObject);
          updateCurrentLocation(locationObject);
        }
      );

      return () => watchPosition.remove();
    })();
  }, [updateCurrentLocation]);

  return (
    <Suspense fallback={<ActivityIndicator size="large" />}>
      {data ? <Redirect href="/home" /> : <Redirect href="/intro" />}
    </Suspense>
  );
}
