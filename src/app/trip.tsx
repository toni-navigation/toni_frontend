import { lineString, point } from '@turf/helpers';
import nearestPointOnLine from '@turf/nearest-point-on-line';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect } from 'react';
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
import { decodePolyline } from '@/functions/decodePolyline';
import { getCalibrationValue } from '@/functions/getCalibrationValue';
import { getShortestDistanceFromPoLToManeuver } from '@/functions/getShortestDistanceFromPoLToManeuver';
import { matchIconType } from '@/functions/matchIconType';
import { parseCoordinate } from '@/functions/parseCoordinate';
import { tripInstructionOutput } from '@/functions/tripInstructionOutput';
import { useTrip } from '@/queries/useTrip';
import { useCalibrationStore } from '@/store/useCalibrationStore';
import { useCurrentLocationStore } from '@/store/useCurrentLocationStore';
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
const THRESHOLD_MAXDISTANCE_FALLBACK_IN_METERS = 20;
const THRESHOLD_REROUTING = 100;

export default function TripPage() {
  const ref = React.useRef<PagerView>(null);
  const tripData = useLocalSearchParams() as SearchParamType;
  const [activePage, setActivePage] = React.useState(0); // Add this state to track the active page
  const [pause, setPause] = React.useState(false);
  const currentLocation = useCurrentLocationStore(
    (state) => state.currentLocation
  );
  const calibration = useCalibrationStore((state) => state.calibration);

  const restructureTripData: LocationProps[] = [
    parseCoordinate(tripData.origin),
    parseCoordinate(tripData.destination),
  ];

  const { data, isPending, isError, error } = useTrip(restructureTripData);

  const handlePageSelected = (
    event: NativeSyntheticEvent<Readonly<{ position: number }>>
  ) => {
    setActivePage(event.nativeEvent.position);
  };

  const decodedShape = data && decodePolyline(data.trip.legs[0].shape);

  const currentLocationPoint = currentLocation
    ? point([currentLocation.coords.latitude, currentLocation.coords.longitude])
    : null;

  const line = decodedShape && lineString(decodedShape.coordinates);

  const nearestPoint =
    line &&
    currentLocationPoint &&
    nearestPointOnLine(line, currentLocationPoint);
  const factor = getCalibrationValue(calibration.factors);
  const shortestDistance =
    data &&
    decodedShape &&
    nearestPoint &&
    getShortestDistanceFromPoLToManeuver(data, decodedShape, nearestPoint);

  let instruction =
    data &&
    shortestDistance &&
    tripInstructionOutput(
      data.trip.legs[0].maneuvers[shortestDistance.maneuverIndex],
      factor
    );
  if (
    nearestPoint &&
    nearestPoint.properties.dist &&
    nearestPoint.properties.dist * 1000 >
      THRESHOLD_MAXDISTANCE_FALLBACK_IN_METERS
  ) {
    instruction = 'Bitte gehe wieder auf die Route.';
  }

  // TODO Wenn keine Route gefunden wird -> unfinite loop, da useEffect jedes Mal ausgeführt wird
  useEffect(() => {
    if (
      nearestPoint &&
      currentLocation &&
      nearestPoint.properties.dist &&
      nearestPoint.properties.dist * 1000 > THRESHOLD_REROUTING
    ) {
      const params = {
        origin: [
          currentLocation.coords.longitude,
          currentLocation.coords.latitude,
        ],
        destination: tripData.destination,
      };

      router.replace({ pathname: `/trip`, params });
    }
  }, [nearestPoint, currentLocation, tripData.destination]);

  if (isPending) {
    return (
      <View>
        <ActivityIndicator size="large" />
        <Text>Route wird berechnet</Text>
      </View>
    );
  }

  if (isError) {
    return <Error error={error.message} />;
  }

  return data && shortestDistance ? (
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
            <TripList
              maneuvers={data.trip.legs[0].maneuvers.slice(
                shortestDistance.maneuverIndex
              )}
              key="0"
            />
            <TripStep key="1">
              <Card
                iconKey={matchIconType(
                  data.trip.legs[0].maneuvers[shortestDistance.maneuverIndex]
                    .type
                )}
              >
                {instruction}
              </Card>
              {/* <Map */}
              {/*  currentLocation={currentLocation} */}
              {/*  nearestPoint={nearestPoint} */}
              {/*  data={data} */}
              {/*  decodedShape={decodedShape} */}
              {/* /> */}
            </TripStep>
          </PagerView>
        </>
      )}

      <View className="mx-5">
        <Button
          onPress={() => setPause(!pause)}
          buttonType="primaryOutline"
          disabled={false}
        >
          {pause ? <Text>Fortsetzen</Text> : <Text>Pause</Text>}
        </Button>
        <Button
          onPress={() => router.replace('/home')}
          buttonType="primary"
          disabled={false}
        >
          <Text>Beenden</Text>
        </Button>
      </View>
    </SafeAreaView>
  ) : (
    <Error error="No data found" />
  );
}
