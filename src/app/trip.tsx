import { lineString, point } from '@turf/helpers';
import nearestPointOnLine from '@turf/nearest-point-on-line';
import { router, useLocalSearchParams } from 'expo-router';
import * as Speech from 'expo-speech';
import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  NativeSyntheticEvent,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import PagerView from 'react-native-pager-view';

import { TripList } from '@/components/TripList';
import { TripStep } from '@/components/TripStep';
import { Button } from '@/components/atoms/Button';
import { Icon } from '@/components/atoms/Icon';
import { Card } from '@/components/organisms/Card';
import { Error } from '@/components/organisms/Error';
import { Map } from '@/components/organisms/Map';
import { TabBar } from '@/components/organisms/TabBar';
import { decodePolyline } from '@/functions/decodePolyline';
import { getCalibrationValue } from '@/functions/getCalibrationValue';
import { getShortestDistanceFromPoLToManeuver } from '@/functions/getShortestDistanceFromPoLToManeuver';
import { matchIconType } from '@/functions/matchIconType';
import { parseCoordinate } from '@/functions/parseCoordinate';
import { photonValue } from '@/functions/photonValue';
import { tripInstructionOutput } from '@/functions/tripInstructionOutput';
import { useReverseData } from '@/mutations/useReverseData';
import { useTrip } from '@/queries/useTrip';
import { useCalibrationStore } from '@/store/useCalibrationStore';
import { useCurrentLocationStore } from '@/store/useCurrentLocationStore';
import stylings from '@/stylings';
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
  const [activePage, setActivePage] = React.useState(0);
  const [pause, setPause] = React.useState(false);
  const currentLocation = useCurrentLocationStore(
    (state) => state.currentLocation
  );
  const [shouldBeRerouted, setShouldBeRerouted] = useState(false);

  const calibration = useCalibrationStore((state) => state.calibration);

  const restructureTripData: LocationProps[] = [
    parseCoordinate(tripData.origin),
    parseCoordinate(tripData.destination),
  ];

  const { data, isPending, isError, error } = useTrip(restructureTripData);
  const rerouteHandler = () => {
    if (!currentLocation) return;

    const params = {
      origin: [
        currentLocation.coords.longitude,
        currentLocation.coords.latitude,
      ],
      destination: tripData.destination,
    };

    setShouldBeRerouted(false);
    router.replace({ pathname: `/trip`, params });
  };
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

  const reverseLocation = useReverseData();
  const createCurrentLocationMessage = async () => {
    Speech.speak('Berechne Standort', {
      language: 'de',
    });
    if (currentLocation) {
      const currentLocationData = await reverseLocation.mutateAsync({
        lat: currentLocation.coords.latitude,
        lon: currentLocation.coords.longitude,
      });
      Speech.speak(photonValue(currentLocationData.features[0]), {
        language: 'de',
      });
    }
  };
  const shouldReroute = useCallback(
    () =>
      nearestPoint &&
      currentLocation &&
      nearestPoint.properties.dist &&
      nearestPoint.properties.dist * 1000 > THRESHOLD_REROUTING,
    [nearestPoint, currentLocation]
  );

  useEffect(() => {
    setShouldBeRerouted(!!shouldReroute());
  }, [nearestPoint, currentLocation, tripData.destination, shouldReroute]);

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
          <View className="mx-auto my-3">
            <TouchableOpacity
              accessibilityHint="Aktueller Standort"
              accessibilityRole="button"
              className="flex flex-row items-center gap-x-4"
              onPress={createCurrentLocationMessage}
            >
              <Icon
                color={stylings.colors['primary-color-dark']}
                size={24}
                icon="location"
              />
              <Text className="text-primary-color-dark opacity-50">
                Aktueller Standort
              </Text>
            </TouchableOpacity>
          </View>

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
              {shouldBeRerouted && (
                <View>
                  <Text>
                    Du befindest dich nicht auf der Route. Möchtest du die Route
                    neu berechnen?
                  </Text>
                  <Button
                    onPress={rerouteHandler}
                    disabled={!currentLocation}
                    buttonType="primary"
                  >
                    Reroute
                  </Button>
                </View>
              )}
              <Card
                iconKey={matchIconType(
                  data.trip.legs[0].maneuvers[shortestDistance.maneuverIndex]
                    .type
                )}
              >
                {instruction}
              </Card>
              {/* <Map */}
              {/*  origin={parseCoordinate(tripData.origin)} */}
              {/*  destination={parseCoordinate(tripData.destination)} */}
              {/*  currentLocation={currentLocation} */}
              {/*  nearestPoint={nearestPoint} */}
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
          {pause ? 'Fortsetzen' : 'Pause'}
        </Button>
        <Button
          onPress={() => router.replace('/home')}
          buttonType="primary"
          disabled={false}
        >
          Beenden
        </Button>
      </View>
    </SafeAreaView>
  ) : (
    <Error error="No data found" />
  );
}
