import { useQuery } from '@tanstack/react-query';
import { useLocalSearchParams } from 'expo-router';
import React, { Suspense } from 'react';
import { ActivityIndicator, SafeAreaView, View } from 'react-native';
import PagerView from 'react-native-pager-view';

import { AlertBar } from '@/components/organisms/AlertBar';
import { Error } from '@/components/organisms/Error';
import { RouteOverview } from '@/components/organisms/RouteOverview';
import { Navigation } from '@/components/trip/Navigation';
import { useTrip } from '@/queries/useTrip';
import { QUERY_KEYS } from '@/query-keys';
import { authenticationControllerGetUserOptions } from '@/services/api-backend/@tanstack/react-query.gen';
import { useAuthStore } from '@/store/useAuthStore';
import { useCurrentLocationStore } from '@/store/useCurrentLocationStore';
import { useUserStore } from '@/store/useUserStore';

export type SearchParamType = {
  origin: string;
  destination: string;
};

const ACCURACY_THRESHOLD = 10;
export function Trip() {
  const tripData = useLocalSearchParams() as SearchParamType;
  const token = useAuthStore((state) => state.token);

  const [showTripOverview, setShowTripOverview] = React.useState(true);
  const currentLocation = useCurrentLocationStore(
    (state) => state.currentLocation
  );
  const ref = React.useRef<PagerView>(null);
  const { data, isError, error, isPending } = useTrip(tripData);
  const calibrationFactor = useUserStore((state) => state.calibrationFactor);
  const { data: user, isPending: isPendingCalibrationFactor } = useQuery({
    ...authenticationControllerGetUserOptions(),
    queryKey: [QUERY_KEYS.user, token],
    enabled: !!token && !calibrationFactor,
  });
  if (isError && error) {
    return <Error error={error.message} />;
  }

  if (isPending || isPendingCalibrationFactor) {
    return <ActivityIndicator size="large" color="#000" />;
  }
  if (showTripOverview && currentLocation) {
    return (
      <RouteOverview
        onCloseClick={() => setShowTripOverview(false)}
        summary={data.trip.summary}
        currentLocation={currentLocation}
        calibrationFactor={calibrationFactor ?? user?.calibrationFactor ?? null}
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
          <Navigation
            data={data}
            ref={ref}
            calibrationFactor={
              calibrationFactor ?? user?.calibrationFactor ?? null
            }
          />
        </View>
      </Suspense>
    </SafeAreaView>
  );
}
