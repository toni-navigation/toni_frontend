import React from 'react';
import { View } from 'react-native';
import { router } from 'expo-router';
import Calibration from '../src/pages/Calibration';
import Button from '../src/components/atoms/Button';
import Intro from '../src/components/organisms/Intro';

export default function CalibrationPage() {
  return (
    <View>
      <Intro />
      <Calibration />
      <Button buttonType="primary" onPress={() => router.push('/home')}>
        Weiter
      </Button>
    </View>
  );
}
