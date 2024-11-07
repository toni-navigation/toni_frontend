import { router } from 'expo-router';
import React from 'react';
import { SafeAreaView, View } from 'react-native';

import { Header } from '@/components/atoms/Header';
import { GeocoderAutocomplete } from '@/components/organisms/GeocoderAutocomplete';
import { useTripStore } from '@/store/useTripStore';

export default function StartPage() {
  const { changeOrigin } = useTripStore((state) => state.actions);
  const origin = useTripStore((state) => state.origin);

  return (
    <SafeAreaView className="flex-1 bg-background">
      {/* eslint-disable-next-line react/jsx-no-undef */}
      <View className="px-8 my-8">
        <Header classes="text-textColor pb-8">Startpunkt suchen</Header>

        <GeocoderAutocomplete
          value={origin}
          placeholder="Start eingeben"
          onChange={(value) => {
            if (value === undefined) {
              changeOrigin(undefined);
            } else {
              changeOrigin(value);
              router.back();
            }
          }}
        />
      </View>
    </SafeAreaView>
  );
}
