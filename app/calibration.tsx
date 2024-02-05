import React from 'react';
import { router } from 'expo-router';
import Calibration from '../src/pages/Calibration';
import useCurrentLocationStore from '../store/locationStore';
import useCalibrationStore from '../store/calibrationStore';
import { View, Text } from 'react-native';

export default function CalibrationPage() {
  const { currentLocation } = useCurrentLocationStore();
  const { calibration, setCalibration } = useCalibrationStore();
  const calibrationHandler = () => {
    if (currentLocation) {
      setCalibration(currentLocation, calibration);
    }
  };

  return (
    <View>
      <Text>{JSON.stringify(currentLocation)}</Text>
      <Calibration
        onCalibrate={calibrationHandler}
        calibration={calibration}
        onClickNext={() => router.push('/home')}
        currentLocation={currentLocation}
      />
    </View>
  );
}
