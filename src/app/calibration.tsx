import { router } from 'expo-router';
import React from 'react';
import { SafeAreaView, ScrollView, useColorScheme } from 'react-native';

import { Calibration } from '@/components/Calibration';
import { Button } from '@/components/atoms/Button';
import { Header } from '@/components/atoms/Header';

export default function CalibrationPage() {
  const colorscheme = useColorScheme();

  return (
    <SafeAreaView
      className={`flex-1 ${colorscheme === 'light' ? 'bg-background-light' : 'bg-background-dark'}`}
    >
      <ScrollView className="mx-8 my-8">
        <Header>Schrittlänge konfigurieren</Header>
        <Calibration />
        <Button
          buttonType="primary"
          disabled={false}
          onPress={() => router.push('/home')}
        >
          Weiter
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
}
