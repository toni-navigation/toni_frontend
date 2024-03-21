import { router } from 'expo-router';
import React, { useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import { Button } from '@/components/atoms/Button';
import { GeocoderAutocomplete } from '@/components/organisms/GeocoderAutocomplete';
import { useReverseData } from '@/mutations/useReverseData';
import { useCurrentLocationStore } from '@/store/useCurrentLocationStore';
import { useTripStore } from '@/store/useTripStore';

export default function Home() {
  const { changeOrigin, changeDestination } = useTripStore(
    (state) => state.actions
  );
  const origin = useTripStore((state) => state.origin);
  const destination = useTripStore((state) => state.destination);

  const currentLocation = useCurrentLocationStore(
    (state) => state.currentLocation
  );

  const colorscheme = useColorScheme();

  const reverseData = useReverseData();

  const startNavigationHandler = () => {
    if (origin && destination) {
      const params = {
        origin: origin.geometry.coordinates,
        destination: destination.geometry.coordinates,
      };

      router.push({ pathname: `/trip`, params });
    }
  };

  useEffect(() => {
    (async () => {
      if (!currentLocation) {
        return;
      }
      const startPosition = {
        lat: currentLocation.coords.latitude,
        lon: currentLocation.coords.longitude,
        radius: 0.05,
      };
      const data = await reverseData.mutateAsync(startPosition);
      changeOrigin(data.features[0]);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (reverseData.error) {
    return (
      <View>
        <Text>reverseData Error, {reverseData.error.message}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView
      className={`flex-1 ${colorscheme === 'light' ? 'bg-background-light' : 'bg-background-dark'}`}
    >
      <ScrollView className="mx-5 my-5" keyboardShouldPersistTaps="always">
        <GeocoderAutocomplete
          value={origin}
          placeholder="Startpunkt eingeben"
          label="Startpunkt"
          onChange={(value) => changeOrigin(value)}
        />
        <GeocoderAutocomplete
          value={destination}
          placeholder="Zielpunkt eingeben"
          label="Zielpunkt"
          onChange={(value) => changeDestination(value)}
        />

        <Button
          onPress={startNavigationHandler}
          buttonType={
            origin === undefined || destination === undefined
              ? 'disabled'
              : 'primary'
          }
        >
          Route starten
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
}
