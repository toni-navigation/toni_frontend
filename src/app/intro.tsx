import { router } from 'expo-router';
import React, { useState } from 'react';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';

import { Button } from '@/components/atoms/Button';
import { Header } from '@/components/atoms/Header';
import { ToniLogo } from '@/components/atoms/icons/ToniLogo';
import { Calibration } from '@/components/calibration/Calibration';

export default function Intro() {
  const [showCalibration, setShowCalibration] = useState(false);
  if (showCalibration) {
    return <Calibration isFromIntro />;
  }

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView className="px-8 py-8">
        <View className="flex items-center">
          <ToniLogo width={100} height={100} />
          <Header classes="pt-4">Willkommen</Header>
          <Text className="mx-auto text-center font-atkinsonRegular text-2xl text-textColor">
            Wir freuen uns, dir deinen Alltag mit Toni zu erleichtern. {'\n'}
            {'\n'}
            Richte nun dein Profil ein. {'\n'} {'\n'}Du kannst Toni auch erstmal
            zwei Wochen kostenlos testen.
          </Text>
        </View>
      </ScrollView>

      <View className="mx-8 mb-3">
        <Button
          width="full"
          buttonType="accent"
          onPress={() => {
            router.push('/auth/login');
          }}
        >
          Login
        </Button>
        <Button
          width="full"
          buttonType="accent"
          onPress={() => router.push('/auth/register')}
        >
          Registrieren
        </Button>
        <Button
          width="full"
          buttonType="primary"
          onPress={() => {
            setShowCalibration(true);
          }}
        >
          Probeabo starten
        </Button>
      </View>
    </SafeAreaView>
  );
}
