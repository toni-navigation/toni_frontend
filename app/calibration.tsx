import React from 'react';
import { View, Text } from 'react-native';
import { router } from 'expo-router';
import useUserStore from '../store/useUserStore';
import Calibration from '../src/pages/Calibration';

export default function CalibrationPage() {
  const { currentLocation, calibration, actions } = useUserStore();
  const calibrationHandler = () => {
    if (currentLocation) {
      actions.setCalibration(currentLocation, calibration);
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
