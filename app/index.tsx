import { Redirect } from 'expo-router';
import storage from '../storage.json';
import { useEffect, useState } from 'react';
import { CurrentLocationProps } from '../types/Types';
import { getCurrentPosition } from '../src/functions/functions';
import { Text, View } from 'react-native';
import useCurrentLocationStore from '../store/locationStore';
import useCalibrationStore from '../store/calibrationStore';

export default function Index() {
  const { setCurrentLocation, currentLocation } = useCurrentLocationStore();
  const { calibration } = useCalibrationStore();
  useEffect(() => {
    (async () => {
      const position = await getCurrentPosition();
      setCurrentLocation(position);
    })();
  }, [setCurrentLocation]);
  if (currentLocation === null || currentLocation === undefined) {
    return <Text>Loading</Text>;
  }
  if (calibration.start === null || calibration.end === null) {
    return <Redirect href="/calibration" />;
  }
  return <Redirect href="/home" />;
}
