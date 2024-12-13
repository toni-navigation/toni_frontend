import { lineString, point } from '@turf/helpers';
import nearestPointOnLine from '@turf/nearest-point-on-line';
import { useLocalSearchParams } from 'expo-router';
import React, { Suspense } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  SafeAreaView,
  View,
} from 'react-native';
import PagerView from 'react-native-pager-view';

import { AlertBar } from '@/components/organisms/AlertBar';
import { Error } from '@/components/organisms/Error';
import { NavigationMap } from '@/components/organisms/NavigationMap';
import { RouteOverview } from '@/components/organisms/RouteOverview';
import { Navigation } from '@/components/trip/Navigation';
import { TripSummary } from '@/components/trip/TripSummary';
import { decodePolyline } from '@/functions/decodePolyline';
import { getMatchingManeuverIndex } from '@/functions/getMatchingManeuvers';
import { useTrip } from '@/queries/useTrip';
import { useCurrentLocationStore } from '@/store/useCurrentLocationStore';

export type SearchParamType = {
  origin: string;
  destination: string;
};

const ACCURACY_THRESHOLD = 10;
export function Trip() {
  const tripData = useLocalSearchParams() as SearchParamType;
  const [showMap, setMap] = React.useState(false);
  const [showTripOverview, setShowTripOverview] = React.useState(true);
  const currentLocation = useCurrentLocationStore(
    (state) => state.currentLocation
  );
  const ref = React.useRef<PagerView>(null);

  const { data, isError, error } = useTrip(tripData);
  const decodedShape = decodePolyline(data.trip.legs[0].shape);
  const line = lineString(decodedShape.coordinates);
  const currentLocationPoint =
    currentLocation &&
    point([currentLocation.coords.latitude, currentLocation.coords.longitude]);
  const snapshot =
    currentLocationPoint && nearestPointOnLine(line, currentLocationPoint);
  const summary = data && data.trip.summary;
  const currentManeuverIndex =
    snapshot && getMatchingManeuverIndex(data.trip, snapshot);
  const screenHeight = Dimensions.get('window').height;
  const viewHeight = 0.68 * screenHeight;
  // const totalManeuverLength = calculateTotalManeuverLength(
  //   data.trip.legs[0].maneuvers,
  //   decodedShape
  // );

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
  if (showMap) {
    return (
      <SafeAreaView className="flex-1 bg-background">
        <View className="flex-1">
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
          <NavigationMap
            height={viewHeight}
            origin={[data.trip.locations[0].lat, data.trip.locations[0].lon]}
            destination={[
              data.trip.locations[1].lat,
              data.trip.locations[1].lon,
            ]}
            snapshot={snapshot}
            decodedShape={decodedShape}
            maneuvers={data.trip.legs[0].maneuvers}
            currentManeuverIndex={currentManeuverIndex}
          />
        </View>
        <View className="mx-5">
          <TripSummary
            // totalManeuverLength={totalManeuverLength}
            summary={summary}
            onPressMap={() => setMap(false)}
            setIconButton="primary"
          />
        </View>
      </SafeAreaView>
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
          <Navigation trip={data.trip} ref={ref} />
          <TripSummary
            // totalManeuverLength={totalManeuverLength}
            summary={summary}
            onPressMap={() => setMap(true)}
            setIconButton="primaryOutline"
          />
        </View>
      </Suspense>
    </SafeAreaView>
  );
}
