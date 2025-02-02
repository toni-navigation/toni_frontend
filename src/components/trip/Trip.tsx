import { useLocalSearchParams } from 'expo-router';
import React, { Suspense, useState } from 'react';
import { ActivityIndicator, SafeAreaView, View } from 'react-native';
import PagerView from 'react-native-pager-view';

import { AlertBar } from '@/components/organisms/AlertBar';
import { Error } from '@/components/organisms/Error';
import { RouteOverview } from '@/components/organisms/RouteOverview';
import { Navigation } from '@/components/trip/Navigation';
import { TripSummary } from '@/components/trip/TripSummary';
import { useTrip } from '@/queries/useTrip';
import { useCurrentLocationStore } from '@/store/useCurrentLocationStore';

export type SearchParamType = {
  origin: string;
  destination: string;
};

const ACCURACY_THRESHOLD = 10;
export function Trip() {
  const tripData = useLocalSearchParams() as SearchParamType;
  const [showMap, setMap] = useState(false);
  const [showTripOverview, setShowTripOverview] = React.useState(true);
  const currentLocation = useCurrentLocationStore(
    (state) => state.currentLocation
  );
  const ref = React.useRef<PagerView>(null);
  const { data, isError, error } = useTrip(tripData);
  const summary = data && data.trip.summary;

  if (isError && error) {
    return <Error error={error.message} />;
  }

  if (showTripOverview && currentLocation) {
    return (
      <RouteOverview
        onCloseClick={() => setShowTripOverview(false)}
        summary={data.trip.summary}
        currentLocation={currentLocation}
      />
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-background">
      {!currentLocation ||
        (currentLocation.coords.accuracy &&
          currentLocation.coords.accuracy > ACCURACY_THRESHOLD && (
            <AlertBar
              text={
                !currentLocation
                  ? 'Kein GPS verfügbar'
                  : `Dein GPS Signal ist auf ${currentLocation?.coords?.accuracy?.toFixed(2) ?? 0} Meter ungenau.`
              }
            />
          ))}

      <Suspense fallback={<ActivityIndicator size="large" />}>
        <View className="flex-1 mx-5">
          <Navigation trip={data.trip} ref={ref} showMap={showMap} />
          <TripSummary
            summary={summary}
            onPressMap={() => setMap((prevState) => !prevState)}
            setIconButton="primaryOutline"
          />
        </View>
      </Suspense>
    </SafeAreaView>
  );
}
