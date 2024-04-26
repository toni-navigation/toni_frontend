import { router } from 'expo-router';
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import { Button } from '@/components/atoms/Button';
import { Header } from '@/components/atoms/Header';
import { Logo } from '@/components/atoms/Logo';
import { getCalibrationValue } from '@/functions/getCalibrationValue';
import { useCalibrationStore } from '@/store/useCalibrationStore';

export default function CalibrationOverviewPage() {
  const calibration = useCalibrationStore((state) => state.calibration);

  const { resetCalibrationStore } = useCalibrationStore(
    (state) => state.actions
  );
  const colorscheme = useColorScheme();

  return (
    <SafeAreaView
      className={`flex-1 ${colorscheme === 'light' ? 'bg-background-light' : 'bg-background-dark'}`}
    >
      <ScrollView className="px-8 mt-8">
        <View className="flex items-center pb-6">
          <Logo
            icon={`${colorscheme === 'light' ? 'logoLight' : 'logoDark'}`}
            size={85}
          />
        </View>
        <Header>Schrittlänge konfigurieren</Header>
        <Text
          className={`text-2xl font-atkinsonRegular ${colorscheme === 'light' ? 'text-text-color-light' : 'text-background-light'}`}
        >
          Deine kalibrierte Schrittlänge beträgt
        </Text>
        <Text
          className={`text-4xl font-generalSansSemi pt-4 ${colorscheme === 'light' ? 'text-primary-color-dark' : 'text-primary-color-light'}`}
        >
          {getCalibrationValue(calibration.meters)} m
        </Text>
      </ScrollView>

      <View className="mx-8 mb-3">
        <Button
          buttonType="primaryOutline"
          disabled={false}
          onPress={() => router.back()}
        >
          Zurück
        </Button>
        <Button
          buttonType="accent"
          disabled={false}
          onPress={() => {
            const params = {
              fromProfile: 1,
            };
            router.push({ pathname: '/profile/calibration', params });
            resetCalibrationStore();
          }}
        >
          Kalibrieren
        </Button>
      </View>
    </SafeAreaView>
  );
}
