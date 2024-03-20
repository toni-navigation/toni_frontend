import { useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { SceneMap, TabView } from 'react-native-tab-view';

import { Error } from '@/components/organisms/Error';
import { TabBar } from '@/components/organisms/TabBar';
import { parseCoordinate } from '@/functions/functions';
import { TripList } from '@/pages/TripList';
import { TripStep } from '@/pages/TripStep';
import { useTrip } from '@/queries/useTrip';
import { LocationProps } from '@/types/Types';

export type SearchParamType = {
  origin: string;
  destination: string;
};
export default function TripPage() {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'first', title: 'Überblick' },
    { key: 'second', title: 'Aktuelles Maneuver' },
  ]);

  const tripData = useLocalSearchParams() as SearchParamType;

  const restructureTripData: LocationProps[] = [
    parseCoordinate(tripData.origin),
    parseCoordinate(tripData.destination),
  ];

  const { data, isPending, isError, error } = useTrip(restructureTripData);

  if (isPending) {
    return (
      <View>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (isError) {
    return <Error error={error.message} />;
  }

  // TODO WARNING: findNodeHandle is deprecated in StrictMode
  return data ? (
    <TabView
      navigationState={{ index, routes }}
      renderScene={SceneMap({
        first: () => TripList({ data: data.trip }),
        second: () => TripStep({ data: data.trip }),
      })}
      onIndexChange={setIndex}
      style={{ backgroundColor: 'white' }}
      renderTabBar={TabBar}
    />
  ) : (
    <Error error="Fehlermeldung" />
  );
}
