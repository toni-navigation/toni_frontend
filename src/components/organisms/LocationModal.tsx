import { router } from 'expo-router';
import React from 'react';
import { SafeAreaView, View } from 'react-native';

import { Header } from '@/components/atoms/Header';
import { GeocoderAutocomplete } from '@/components/organisms/GeocoderAutocomplete';
import { CreatePhotonFeatureDto } from '@/services/api-backend';

interface LocationModalProps {
  changeLocation: (location: CreatePhotonFeatureDto | undefined | null) => void;
  location: CreatePhotonFeatureDto | undefined | null;
  children: React.ReactNode;
}
export function LocationModal({
  children,
  location,
  changeLocation,
}: LocationModalProps) {
  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="px-8 my-8">
        <Header classes="text-textColor pb-8">{children}</Header>

        <GeocoderAutocomplete
          value={location}
          placeholder="Start eingeben"
          onChange={(value) => {
            if (value === undefined) {
              changeLocation(undefined);
            } else {
              changeLocation(value);
              router.back();
            }
          }}
        />
      </View>
    </SafeAreaView>
  );
}
