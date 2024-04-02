import * as Location from 'expo-location';
import { Redirect } from 'expo-router';
import { useEffect } from 'react';
import { Linking, Text } from 'react-native';

import { useCurrentLocationStore } from '@/store/useCurrentLocationStore';

export default function Index() {
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
          const position = {
            coords: {
              speed: locationObject.coords.speed,
              heading: locationObject.coords.heading,
              accuracy: locationObject.coords.accuracy,
              altitudeAccuracy: locationObject.coords.altitudeAccuracy,
              altitude: locationObject.coords.altitude,
              longitude: locationObject.coords.longitude,
              latitude: locationObject.coords.latitude,
            },
            timestamp: locationObject.timestamp,
          };
          updateCurrentLocation(position);
        }
      );

      return () => watchPosition.remove();
    })();
  }, [updateCurrentLocation]);

  if (currentLocation === null || currentLocation === undefined) {
    return <Text>Loading</Text>;
  }

  // if (calibration.start === null || calibration.end === null) {
  //   return <Redirect href="/calibration" />;
  // }
  return <Redirect href="/calibration" />;
}
