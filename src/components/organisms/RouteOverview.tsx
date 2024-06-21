import { router } from 'expo-router';
import React from 'react';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';

import { Button } from '@/components/atoms/Button';
import { Header } from '@/components/atoms/Header';
import { SummaryProps } from '@/types/Valhalla-Types';

interface RouteOverviewProps {
  onCloseClick: () => void;
  summary: SummaryProps;
}

export function RouteOverview({ onCloseClick, summary }: RouteOverviewProps) {
  const convertSecondsToMinutes = (seconds: number) => Math.floor(seconds / 60);

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView className="flex flex-col flex-1 px-8 my-8">
        <Header classes="text-textColor pt-4">Route Übersicht</Header>
        <Text className="text-2xl font-atkinsonRegular text-textColor">
          Deine Route beträgt:
        </Text>
        <Text className="text-2xl font-atkinsonRegular text-textColor">
          {summary.length} km
        </Text>
        <Text className="text-2xl font-atkinsonRegular text-textColor">
          {convertSecondsToMinutes(summary.time)} Minuten
        </Text>
      </ScrollView>

      <View className="px-8 my-8">
        <Button onPress={() => router.back()} buttonType="primaryOutline">
          Zurück
        </Button>
        <Button onPress={onCloseClick} buttonType="primary">
          Weiter
        </Button>
      </View>
    </SafeAreaView>
  );
}
