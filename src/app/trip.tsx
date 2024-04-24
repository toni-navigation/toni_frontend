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
import MapView, { Marker, Polyline } from 'react-native-maps';
import PagerView from 'react-native-pager-view';

import { TripList } from '@/components/TripList';
import { TripStep } from '@/components/TripStep';
import { ListItem } from '@/components/atoms/ListItem';
import { Error } from '@/components/organisms/Error';
import { Map } from '@/components/organisms/Map';
import { TabBar } from '@/components/organisms/TabBar';
import { decodePolyline } from '@/functions/decodePolyline';
import { getCalibrationValue } from '@/functions/getCalibrationValue';
import { getShortestDistanceFromPoLToManeuver } from '@/functions/getShortestDistanceFromPoLToManeuver';
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
const THRESHOLD_MAXDISTANCE_FALLBACK_IN_METERS = 20;
const THRESHOLD_REROUTING = 100;

export default function TripPage() {
  const ref = React.useRef<PagerView>(null);
  const tripData = useLocalSearchParams() as SearchParamType;
  const [activePage, setActivePage] = React.useState(0); // Add this state to track the active page
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

  if (!currentLocation || !data) {
    return (
      <SafeAreaView>
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  return data && shortestDistance ? (
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
        <TripList
          maneuvers={data.trip.legs[0].maneuvers.slice(
            shortestDistance.maneuverIndex
          )}
          key="0"
        />
        <TripStep key="1">
          <ListItem
            key={
              data.trip.legs[0].maneuvers[shortestDistance.maneuverIndex]
                .begin_shape_index +
              data.trip.legs[0].maneuvers[shortestDistance.maneuverIndex]
                .end_shape_index
            }
          >
            {instruction}
          </ListItem>
          <Map
            currentLocation={currentLocation}
            nearestPoint={nearestPoint}
            data={data}
            decodedShape={decodedShape}
          />
        </TripStep>
      </PagerView>
    </SafeAreaView>
  ) : (
    <Error error="No data found" />
  );
}
