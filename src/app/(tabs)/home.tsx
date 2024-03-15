import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { PhotonFeature } from 'src/services/api-photon';

import { Button } from '@/components/atoms/Button';
import { GeocoderAutocomplete } from '@/components/organisms/GeocoderAutocomplete';
import { photonValue } from '@/functions/functions';
import { useReverseData, useTrip } from '@/functions/mutations';
import { useUserStore } from '@/store/useUserStore';
import { LocationProps, PointsProps } from '@/types/Types';

const INITIAL_POINTS: PointsProps = {
  start: { query: '' },
  destination: {
    query: '',
  },
};
export default function Home() {
  const [points, setPoints] = useState<PointsProps>(INITIAL_POINTS);
  const [origin, setOrigin] = useState<PhotonFeature>();
  const [destination, setDestination] = useState<PhotonFeature>();

  const { actions, currentLocation } = useUserStore();
  const colorscheme = useColorScheme();

  const reverseData = useReverseData();

  const start = {
    lat: currentLocation?.coords.latitude,
    lon: currentLocation?.coords.longitude,
  };
  const tripPoints: (LocationProps | undefined | null)[] = [
    start,
    points.destination.location,
  ];
  const tripData = useTrip();

  const startNavigationHandler = async () => {
    const data = await tripData.mutateAsync(tripPoints);
    actions.setTrip(data);
    router.push('/trip');
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
      const newPoints = { ...points };
      newPoints.start.location = {
        lat: data.features[0].geometry.coordinates[1],
        lon: data.features[0].geometry.coordinates[0],
      };
      newPoints.start.query = photonValue(data.features[0]);
      setPoints(newPoints);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (tripData.isPending || reverseData.isPending) {
    return <ActivityIndicator />;
  }

  if (tripData.error) {
    return <Text>Error loading TripData, {tripData.error.message}</Text>;
  }

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
          onChange={(value) => setOrigin(value)}
        />
        <GeocoderAutocomplete
          value={destination}
          placeholder="Zielpunkt eingeben"
          label="Zielpunkt"
          onChange={(value) => setDestination(value)}
        />

        <Button
          onPress={startNavigationHandler}
          buttonType={
            points.start.location === undefined ||
            points.destination.location === undefined ||
            points.start.query === undefined ||
            points.destination.query === undefined ||
            points.start.query?.length < 2 ||
            points.destination.query?.length < 2
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
