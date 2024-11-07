import { router } from 'expo-router';
import React from 'react';
import { SafeAreaView, View } from 'react-native';

import { Header } from '@/components/atoms/Header';
import { GeocoderAutocomplete } from '@/components/organisms/GeocoderAutocomplete';
import { useTripStore } from '@/store/useTripStore';

export default function DestinationPage() {
  const { changeDestination } = useTripStore((state) => state.actions);
  const destination = useTripStore((state) => state.destination);

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="px-8 my-8">
        <Header classes="text-textColor pb-8">Ziel suchen</Header>

        <GeocoderAutocomplete
          value={destination}
          placeholder="Ziel eingeben"
          label="Ziel"
          onChange={(value) => {
            if (value === undefined) {
              changeDestination(undefined);
            } else {
              changeDestination(value);
              router.back();
            }
          }}
        />
      </View>
    </SafeAreaView>
  );
}
