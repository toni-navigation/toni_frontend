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
import { SummaryProps } from '@/types/Valhalla-Types';

interface RouteOverviewProps {
  onCloseClick: () => void;
  summary: SummaryProps;
}

export function RouteOverview({ onCloseClick, summary }: RouteOverviewProps) {
  const colorscheme = useColorScheme();
  const convertSecondsToMinutes = (seconds: number) => Math.floor(seconds / 60);

  return (
    <SafeAreaView>
      <View className="justify-center items-center h-full w-full p-6">
        <ScrollView className="flex flex-col flex-1">
          <Header
            classes={`${colorscheme === 'light' ? 'text-text-color-light' : 'text-text-color-dark'}`}
          >
            Route Übersicht
          </Header>
          <Text
            className={`text-2xl font-atkinsonRegular ${colorscheme === 'light' ? 'text-text-color-light' : 'text-text-color-dark'}`}
          >
            Deine Route beträgt:
          </Text>
          <Text
            className={`text-2xl font-atkinsonRegular ${colorscheme === 'light' ? 'text-text-color-light' : 'text-text-color-dark'}`}
          >
            {summary.length} km
          </Text>
          <Text
            className={`text-2xl font-atkinsonRegular ${colorscheme === 'light' ? 'text-text-color-light' : 'text-text-color-dark'}`}
          >
            {convertSecondsToMinutes(summary.time)} Minuten
          </Text>
        </ScrollView>

        <View className="w-full">
          <Button onPress={() => router.back()} buttonType="primaryOutline">
            Zurück
          </Button>
          <Button onPress={onCloseClick} buttonType="primary">
            Weiter
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
}
