import React from 'react';
import { View } from 'react-native';
import { router } from 'expo-router';
import useUserStore from '../store/useUserStore';
import Calibration from '../src/pages/Calibration';
import Button from '../src/components/atoms/Button';
import Intro from '../src/components/organisms/Intro';

export default function CalibrationPage() {
  const { currentLocation, calibration } = useUserStore();

  return (
    <View>
      <Intro currentLocation={currentLocation} />
      <Calibration />
      <Button
        buttonType="primary"
        onPress={() => router.push('/home')}
        disabled={!calibration.isStart}
      >
        Speichern
      </Button>
    </View>
  );
}
