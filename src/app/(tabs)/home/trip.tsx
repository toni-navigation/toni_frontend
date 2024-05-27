import distance from '@turf/distance';
import { lineString, point } from '@turf/helpers';
import nearestPointOnLine from '@turf/nearest-point-on-line';
import { router, useLocalSearchParams } from 'expo-router';
import * as Speech from 'expo-speech';
import React, { useEffect } from 'react';
import {
  ActivityIndicator,
  NativeSyntheticEvent,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import PagerView from 'react-native-pager-view';

import { Button } from '@/components/atoms/Button';
import { Icon } from '@/components/atoms/Icon';
import { AlertBar } from '@/components/organisms/AlertBar';
import { Card } from '@/components/organisms/Card';
import { Error } from '@/components/organisms/Error';
import { PopUp } from '@/components/organisms/PopUp';
import { RouteOverview } from '@/components/organisms/RouteOverview';
import { TabBar } from '@/components/organisms/TabBar';
import {
  ACCURACY_THRESHOLD,
  NavigateToRoute,
} from '@/components/trip/NavigateToRoute';
import { TripList } from '@/components/trip/TripList';
import { TripStep } from '@/components/trip/TripStep';
import { decodePolyline } from '@/functions/decodePolyline';
import { getCalibrationValue } from '@/functions/getCalibrationValue';
import { getMatchingManeuvers } from '@/functions/getMatchingManeuvers';
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
const THRESHOLD_MAXDISTANCE_FALLBACK_IN_METERS = 10;
const THRESHOLD_REROUTING = 100;
export default function TripPage() {
  const colorscheme = useColorScheme();

  const ref = React.useRef<PagerView>(null);
  const tripData = useLocalSearchParams() as SearchParamType;
  const [activePage, setActivePage] = React.useState(0);
  const [pause, setPause] = React.useState(false);
  const [showPopUp, setShowPopUp] = React.useState(false);
  const [showTripOverview, setShowTripOverview] = React.useState(true);

  const currentLocation = useCurrentLocationStore(
    (state) => state.currentLocation
  );
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

    // TODO: Evtl andere Lösung?
    router.replace({ pathname: `/home/trip`, params });
  };
  const handlePageSelected = (
    event: NativeSyntheticEvent<Readonly<{ position: number }>>
  ) => {
    setActivePage(event.nativeEvent.position);
  };

  const decodedShape = data && decodePolyline(data.trip.legs[0].shape);
  const currentLocationPoint =
    currentLocation &&
    point([currentLocation.coords.latitude, currentLocation.coords.longitude]);

  const startPoint =
    decodedShape &&
    point([decodedShape.coordinates[0][0], decodedShape.coordinates[0][1]]);

  const line = decodedShape && lineString(decodedShape.coordinates);

  const nearestPoint =
    line &&
    currentLocationPoint &&
    nearestPointOnLine(line, currentLocationPoint);
  const factor = getCalibrationValue(calibration.factors);
  const calculatedManeuvers =
    data && nearestPoint && getMatchingManeuvers(data, nearestPoint);

  const instruction =
    data &&
    calculatedManeuvers?.currentManeuver &&
    tripInstructionOutput(calculatedManeuvers.currentManeuver, factor);

  const notOnRoute =
    currentLocationPoint &&
    startPoint &&
    distance(currentLocationPoint, startPoint) * 1000 >
      THRESHOLD_MAXDISTANCE_FALLBACK_IN_METERS &&
    !!nearestPoint &&
    !!nearestPoint.properties.dist &&
    nearestPoint.properties.dist * 1000 >
      THRESHOLD_MAXDISTANCE_FALLBACK_IN_METERS;

  useEffect(() => {
    if (instruction && !notOnRoute && !showTripOverview) {
      Speech.speak(instruction, {
        language: 'de',
      });
    }
  }, [instruction, notOnRoute, showTripOverview]);
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

  if (notOnRoute) {
    return (
      <NavigateToRoute
        currentLocation={currentLocation}
        distanceToStart={distance(currentLocationPoint, nearestPoint) * 1000}
        nearestPoint={nearestPoint}
      >
        <View />
        {/* <Map */}
        {/*  origin={parseCoordinate(tripData.origin)} */}
        {/*  destination={{ */}
        {/*    lat: nearestPoint.geometry.coordinates[0], */}
        {/*    lon: nearestPoint.geometry.coordinates[1], */}
        {/*  }} */}
        {/*  nearestPoint={nearestPoint} */}
        {/*  decodedShape={decodedShape} */}
        {/*  maneuvers={data.trip.legs[0].maneuvers} */}
        {/* /> */}
      </NavigateToRoute>
    );
  }

  if (data && showTripOverview) {
    return (
      <RouteOverview
        onCloseClick={() => setShowTripOverview(false)}
        summary={data.trip.summary}
      />
    );
  }

  return data &&
    calculatedManeuvers?.currentManeuver &&
    calculatedManeuvers.maneuverIndex ? (
    <SafeAreaView
      className={`flex-1 ${colorscheme === 'light' ? 'bg-background-light' : 'bg-background-dark'}`}
    >
      <PopUp
        visible={showPopUp}
        onClick={() => setShowPopUp(false)}
        onClickButtonText="Beenden"
        onCloseClick={() => setShowPopUp(false)}
        onCloseButtonText="Schließen"
        onDismiss={() => router.back()}
      >
        <Text
          className={`text-2xl text-text-col font-atkinsonRegular text-center ${colorscheme === 'light' ? 'text-text-color-dark' : 'text-text-color-light'}`}
        >
          Möchtest du die Navigation wirklich beenden?
        </Text>
      </PopUp>
      {pause ? (
        <Card iconKey="pause">Pause</Card>
      ) : (
        <>
          {currentLocation &&
            currentLocation.coords.accuracy &&
            currentLocation.coords.accuracy > ACCURACY_THRESHOLD && (
              <AlertBar
                text={`Dein GPS Signal ist auf ${currentLocation?.coords?.accuracy?.toFixed(2) ?? 0} Meter ungenau.`}
              />
            )}
          <TabBar
            setPage={(page) => ref.current?.setPage(page)}
            activePage={activePage}
          />
          <View className="flex flex-row justify-end mx-5 my-5">
            <TouchableOpacity
              accessibilityHint="Mein aktueller Standort"
              accessibilityRole="button"
              className="flex flex-row items-end gap-x-8"
              onPress={createCurrentLocationMessage}
            >
              <Icon
                color={`${colorscheme === 'light' ? stylings.colors['primary-color-dark'] : stylings.colors['primary-color-light']}`}
                size={50}
                icon="currentLocation"
              />
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
                calculatedManeuvers.maneuverIndex
              )}
              key="0"
            />
            <TripStep
              key="1"
              notOnRoute={
                !!nearestPoint &&
                currentLocation &&
                !!nearestPoint.properties.dist &&
                nearestPoint.properties.dist * 1000 > THRESHOLD_REROUTING
              }
              onReroute={rerouteHandler}
              icon={matchIconType(calculatedManeuvers?.currentManeuver.type)}
              instruction={instruction}
            />
          </PagerView>
        </>
      )}

      <View className="mx-5 mb-5">
        <Button onPress={() => setPause(!pause)} buttonType="primaryOutline">
          {pause ? 'Fortsetzen' : 'Pause'}
        </Button>
        <Button onPress={() => setShowPopUp(true)} buttonType="primary">
          Beenden
        </Button>
      </View>
    </SafeAreaView>
  ) : (
    <Error error="No data found" />
  );
}
