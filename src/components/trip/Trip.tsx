import { router, useLocalSearchParams } from 'expo-router';
import React, { Suspense } from 'react';
import { ActivityIndicator, SafeAreaView, Text, View } from 'react-native';
import PagerView from 'react-native-pager-view';

import { AlertBar } from '@/components/organisms/AlertBar';
import { Error } from '@/components/organisms/Error';
import { PopUp } from '@/components/organisms/PopUp';
import { RouteOverview } from '@/components/organisms/RouteOverview';
import { TabBar } from '@/components/organisms/TabBar';
import { Navigation } from '@/components/trip/Navigation';
import { useTrip } from '@/queries/useTrip';
import { useCurrentLocationStore } from '@/store/useCurrentLocationStore';

export type SearchParamType = {
  origin: string;
  destination: string;
};

const ACCURACY_THRESHOLD = 10;
export function Trip() {
  const tripData = useLocalSearchParams() as SearchParamType;
  const [showPopUp, setShowPopUp] = React.useState(false);
  const [showTripOverview, setShowTripOverview] = React.useState(true);
  const currentLocation = useCurrentLocationStore(
    (state) => state.currentLocation
  );
  const ref = React.useRef<PagerView>(null);

  const { data, isError, error } = useTrip(tripData);

  const summary = data && data.trip.summary;
  const convertSecondsToMinutes = (seconds: number | undefined) => {
    if (!seconds) return 0;

    return Math.floor(seconds / 60);
  };

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

  // TODO reset trip origin when stop navigation
  return (
    <SafeAreaView className="flex-1 bg-background">
      <PopUp
        visible={showPopUp}
        onClick={() => setShowPopUp(false)}
        onClickButtonText="Beenden"
        onCloseClick={() => setShowPopUp(false)}
        onCloseButtonText="Schließen"
        onDismiss={() => router.back()}
      >
        <Text className="text-2xl text-text-col font-atkinsonRegular text-center text-background">
          Möchtest du die Navigation wirklich beenden?
        </Text>
      </PopUp>

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
      <TabBar />
      <Suspense fallback={<ActivityIndicator size="large" />}>
        <Navigation trip={data.trip} ref={ref} />
        <View className="m-auto">
          <Text className="py-8 text-accent text-2xl font-generalSansSemi">
            {summary.length} km, {convertSecondsToMinutes(summary.time)} Minuten
          </Text>
        </View>
      </Suspense>
    </SafeAreaView>
  );
}
