import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import {
  ActivityIndicator,
  NativeSyntheticEvent,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import PagerView from 'react-native-pager-view';

import { TripList } from '@/components/TripList';
import { TripStep } from '@/components/TripStep';
import { Error } from '@/components/organisms/Error';
import { TabBar } from '@/components/organisms/TabBar';
import { parseCoordinate } from '@/functions/parseCoordinate';
import { useTrip } from '@/queries/useTrip';
import { LocationProps } from '@/types/Types';

export type SearchParamType = {
  origin: string;
  destination: string;
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pager: {
    flex: 1,
    alignSelf: 'stretch',
  },
});
export default function TripPage() {
  const ref = React.useRef<PagerView>(null);
  const tripData = useLocalSearchParams() as SearchParamType;
  const [activePage, setActivePage] = React.useState(0); // Add this state to track the active page

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
  const handlePageSelected = (
    event: NativeSyntheticEvent<Readonly<{ position: number }>>
  ) => {
    setActivePage(event.nativeEvent.position);
  };

  return data ? (
    <SafeAreaView style={styles.container}>
      <TabBar
        setPage={(page) => ref.current?.setPage(page)}
        activePage={activePage}
      />
      <PagerView
        onPageSelected={(event) => handlePageSelected(event)}
        initialPage={0}
        style={styles.pager}
        ref={ref}
      >
        <TripList data={data.trip} key="0" />
        <TripStep data={data.trip} key="1" />
      </PagerView>
    </SafeAreaView>
  ) : (
    <Error error="No data found" />
  );
}
