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
    <SafeAreaView>
      <View className="justify-center items-center h-full w-full p-6">
        <ScrollView className="flex flex-col flex-1">
          <Header classes="text-textColor">Route Übersicht</Header>
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
