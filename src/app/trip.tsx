import { router, useLocalSearchParams } from 'expo-router';
import React from 'react';
import {
  ActivityIndicator,
  NativeSyntheticEvent,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import PagerView from 'react-native-pager-view';

import { TripList } from '@/components/TripList';
import { TripStep } from '@/components/TripStep';
import { Button } from '@/components/atoms/Button';
import { Card } from '@/components/organisms/Card';
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
  pager: {
    flex: 1,
    alignSelf: 'stretch',
  },
});
export default function TripPage() {
  const ref = React.useRef<PagerView>(null);
  const tripData = useLocalSearchParams() as SearchParamType;
  const [activePage, setActivePage] = React.useState(0); // Add this state to track the active page
  const [pause, setPause] = React.useState(false);

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
    <SafeAreaView className="flex-1 bg-background-light">
      {pause ? (
        <Card iconKey="pause">Pause</Card>
      ) : (
        <>
          <TabBar
            setPage={(page) => ref.current?.setPage(page)}
            activePage={activePage}
          />
          <PagerView
            onPageSelected={(event) => handlePageSelected(event)}
            initialPage={activePage}
            style={styles.pager}
            ref={ref}
          >
            <TripList data={data.trip} key="0" />
            <TripStep data={data.trip} key="1" />
          </PagerView>
        </>
      )}

      <View className="mx-5">
        <Button onPress={() => setPause(!pause)} buttonType="primaryOutline">
          {pause ? <Text>Fortsetzen</Text> : <Text>Pause</Text>}
        </Button>
        <Button onPress={() => router.replace('/home')} buttonType="primary">
          <Text>Beenden</Text>
        </Button>
      </View>
    </SafeAreaView>
  ) : (
    <Error error="No data found" />
  );
}
