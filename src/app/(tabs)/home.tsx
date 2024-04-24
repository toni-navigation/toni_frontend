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
import { IconButton } from '@/components/atoms/IconButton';
import { GeocoderAutocomplete } from '@/components/organisms/GeocoderAutocomplete';
import { Map } from '@/components/organisms/Map';
import { getBbox } from '@/functions/getBbox';
import { useReverseData } from '@/mutations/useReverseData';
import { useCurrentLocationStore } from '@/store/useCurrentLocationStore';
import { useTripStore } from '@/store/useTripStore';

export default function Home() {
  // const markerRef = React.useRef(null);
  const { changeOrigin, changeDestination, switchOriginDestination } =
    useTripStore((state) => state.actions);
  const origin = useTripStore((state) => state.origin);
  const destination = useTripStore((state) => state.destination);

  const currentLocation = useCurrentLocationStore(
    (state) => state.currentLocation
  );

  const colorscheme = useColorScheme();

  const reverseData = useReverseData();

  if (reverseData.error) {
    return (
      <View>
        <Text>reverseData Error, {reverseData.error.message}</Text>
      </View>
    );
  }
  const startNavigationHandler = async () => {
    let newOrigin;
    if (origin === null) {
      newOrigin = currentLocation
        ? [currentLocation.coords.longitude, currentLocation.coords.latitude]
        : undefined;
    } else if (origin) {
      newOrigin = origin.geometry.coordinates;
    }
    if (newOrigin && destination) {
      const params = {
        origin: newOrigin,
        destination: destination.geometry.coordinates,
      };

      router.push({ pathname: `/trip`, params });
    }
  };

  if (reverseData.error) {
    return (
      <View>
        <Text>reverseData Error</Text>
      </View>
    );
  }

  const bbox = currentLocation && getBbox(currentLocation);
  const bboxCoordinates = bbox && [
    { latitude: bbox[1], longitude: bbox[0] }, // southwest corner
    { latitude: bbox[1], longitude: bbox[2] }, // northwest corner
    { latitude: bbox[3], longitude: bbox[2] }, // northeast corner
    { latitude: bbox[3], longitude: bbox[0] }, // southeast corner
    { latitude: bbox[1], longitude: bbox[0] }, // closing the polygon - southwest corner
  ];

  let newOrigin;
  if (origin === null) {
    newOrigin = currentLocation
      ? {
          lat: currentLocation.coords.latitude,
          lon: currentLocation.coords.longitude,
        }
      : undefined;
  } else if (origin) {
    newOrigin = {
      lat: origin.geometry.coordinates[1],
      lon: origin.geometry.coordinates[0],
    };
  }

  return (
    <SafeAreaView
      className={`flex-1 ${colorscheme === 'light' ? 'bg-background-light' : 'bg-background-dark'}`}
    >
      <ScrollView className="mx-8 my-8" keyboardShouldPersistTaps="always">
        <Header>Hallo</Header>
        <GeocoderAutocomplete
          value={origin}
          placeholder="Start eingeben"
          label="Start"
          onChange={(value) => changeOrigin(value)}
        />

        <IconButton
          onPress={switchOriginDestination}
          disabled={origin === undefined || destination === undefined}
          buttonType="primary"
          icon="switchArrow"
        />
        <GeocoderAutocomplete
          value={destination}
          placeholder="Ziel eingeben"
          label="Ziel"
          onChange={(value) => changeDestination(value)}
        />

        <Map
          bbox={bboxCoordinates}
          origin={newOrigin}
          destination={
            destination
              ? {
                  lat: destination.geometry.coordinates[1],
                  lon: destination.geometry.coordinates[0],
                }
              : undefined
          }
          currentLocation={currentLocation}
        />
        <Button
          onPress={startNavigationHandler}
          disabled={origin === undefined || destination === undefined}
          buttonType="accent"
        >
          Route starten
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
}
