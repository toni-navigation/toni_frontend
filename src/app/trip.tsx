import { lineString, point } from '@turf/helpers';
import nearestPointOnLine from '@turf/nearest-point-on-line';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect } from 'react';
import {
  ActivityIndicator,
  NativeSyntheticEvent,
  SafeAreaView,
  ScrollView,
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
import { TabBar } from '@/components/organisms/TabBar';
import { decodePolyline } from '@/functions/decodePolyline';
import { getCalibrationValue } from '@/functions/getCalibrationValue';
import { getDistanceInMeter } from '@/functions/getDistanceInMeter';
import { getShortestDistanceFromPoLToManeuver } from '@/functions/getShortestDistanceFromPoLToManeuver';
import { parseCoordinate } from '@/functions/parseCoordinate';
import { tripInstructionOutput } from '@/functions/tripInstructionOutput';
import { useTrip } from '@/queries/useTrip';
import { useCalibrationStore } from '@/store/useCalibrationStore';
import { useCurrentLocationStore } from '@/store/useCurrentLocationStore';
import { DecodedShapeProps, LocationProps } from '@/types/Types';

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

  if (!currentLocation || !data) {
    return (
      <SafeAreaView>
        <ScrollView>
          <Text>Loading...</Text>
        </ScrollView>
      </SafeAreaView>
    );
  }
  const handlePageSelected = (
    event: NativeSyntheticEvent<Readonly<{ position: number }>>
  ) => {
    setActivePage(event.nativeEvent.position);
  };

  const decodedShape: DecodedShapeProps = decodePolyline(
    data.trip.legs[0].shape
  );

  const currentLocationPoint = point([
    currentLocation.coords.latitude,
    currentLocation.coords.longitude,
  ]);

  const line = lineString(decodedShape.coordinates);

  const nearestPoint = nearestPointOnLine(line, currentLocationPoint);
  const factor = getCalibrationValue(calibration.factors);
  const shortestDistance = getShortestDistanceFromPoLToManeuver(
    data,
    decodedShape,
    nearestPoint
  );
  let instruction = tripInstructionOutput(
    data.trip.legs[0].maneuvers[shortestDistance.maneuverIndex],
    factor
  );
  if (
    nearestPoint.properties.dist &&
    nearestPoint.properties.dist * 1000 >
      THRESHOLD_MAXDISTANCE_FALLBACK_IN_METERS
  ) {
    instruction = 'Bitte gehe wieder auf die Route.';
  }

  // useEffect(() => {
  //   if (
  //     nearestPoint.properties.dist &&
  //     nearestPoint.properties.dist * 1000 > THRESHOLD_REROUTING
  //   ) {
  //     const params = {
  //       origin: [
  //         currentLocation.coords.longitude,
  //         currentLocation.coords.latitude,
  //       ],
  //       destination: tripData.destination,
  //     };
  //
  //     router.push({ pathname: `/trip`, params });
  //   }
  // }, [nearestPoint, currentLocation, tripData.destination]);

  return (
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
          <MapView
            style={{ height: 400 }}
            initialRegion={{
              latitude: currentLocation?.coords.latitude || 0,
              longitude: currentLocation?.coords.longitude || 0,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            <Marker
              coordinate={{
                latitude: nearestPoint.geometry.coordinates[0],
                longitude: nearestPoint.geometry.coordinates[1],
              }}
              title="Nearest Point"
              description="You are here"
            />
            {currentLocation && (
              <Marker
                coordinate={{
                  latitude: currentLocation.coords.latitude,
                  longitude: currentLocation.coords.longitude,
                }}
                title="Current Location"
                description="You are here"
              />
            )}
            {data.trip.legs[0] &&
              decodedShape?.coordinates.map((coord, index) => {
                if (index === 0) {
                  return null;
                }

                return (
                  <Polyline
                    key={coord.toString()}
                    coordinates={[
                      {
                        latitude: decodedShape.coordinates[index - 1][0],
                        longitude: decodedShape.coordinates[index - 1][1],
                      },
                      {
                        latitude: coord[0],
                        longitude: coord[1],
                      },
                    ]}
                  />
                );
              })}
          </MapView>
        </TripStep>
      </PagerView>
    </SafeAreaView>
  );
}
