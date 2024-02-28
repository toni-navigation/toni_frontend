import React from 'react';
import { SafeAreaView, ScrollView, useColorScheme } from 'react-native';
import { router } from 'expo-router';
import useUserStore from '../store/useUserStore';
import Calibration from '../src/pages/Calibration';
import Button from '../src/components/atoms/Button';
import Intro from '../src/components/organisms/Intro';

export default function CalibrationPage() {
  const { currentLocation } = useUserStore();
  const colorscheme = useColorScheme();

  return (
    <SafeAreaView
      className={`flex-1 ${colorscheme === 'light' ? 'bg-background-light' : 'bg-background-dark'}`}
    >
      <ScrollView>
        <Intro currentLocation={currentLocation} />
        <Calibration />
        <Button buttonType="primary" onPress={() => router.push('/home')}>
          Speichern
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
}
