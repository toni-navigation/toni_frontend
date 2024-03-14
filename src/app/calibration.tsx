import { router } from 'expo-router';
import React from 'react';
import { SafeAreaView, ScrollView, useColorScheme, View } from 'react-native';

import Button from '../components/atoms/Button';
import Intro from '../components/organisms/Intro';
import Calibration from '../pages/Calibration';

export default function CalibrationPage() {
  const colorscheme = useColorScheme();

  return (
    <SafeAreaView
      className={`flex-1 ${colorscheme === 'light' ? 'bg-background-light' : 'bg-background-dark'}`}
    >
      <ScrollView className="mx-5 my-5">
        <Intro />
        <Calibration />
        <Button buttonType="primary" onPress={() => router.push('/home')}>
          Weiter
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
}
