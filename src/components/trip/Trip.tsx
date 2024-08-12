import { lineString, point } from '@turf/helpers';
import nearestPointOnLine from '@turf/nearest-point-on-line';
import { router, useLocalSearchParams } from 'expo-router';
import * as Speech from 'expo-speech';
import React, { useContext, useEffect } from 'react';
import {
  ActivityIndicator,
  NativeSyntheticEvent,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import PagerView from 'react-native-pager-view';

import { themes } from '@/colors';
import { ThemeContext } from '@/components/ThemeProvider';
import { BigHeader } from '@/components/atoms/BigHeader';
import { Button } from '@/components/atoms/Button';
import { IconButton } from '@/components/atoms/IconButton';
import { Close } from '@/components/atoms/icons/Close';
import { Flag } from '@/components/atoms/icons/Flag';
import { Location } from '@/components/atoms/icons/Location';
import { Pause } from '@/components/atoms/icons/Pause';
import { Play } from '@/components/atoms/icons/Play';
import { AlertBar } from '@/components/organisms/AlertBar';
import { Card } from '@/components/organisms/Card';
import { Error } from '@/components/organisms/Error';
import { PopUp } from '@/components/organisms/PopUp';
import { RouteOverview } from '@/components/organisms/RouteOverview';
import { TabBar } from '@/components/organisms/TabBar';
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
const ACCURACY_THRESHOLD = 10;
export function Trip() {
  const { theme } = useContext(ThemeContext);
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

  const handlePageSelected = (
    event: NativeSyntheticEvent<Readonly<{ position: number }>>
  ) => {
    setActivePage(event.nativeEvent.position);
  };

  const decodedShape = data && decodePolyline(data.trip.legs[0].shape);
  const currentLocationPoint =
    currentLocation &&
    point([currentLocation.coords.latitude, currentLocation.coords.longitude]);

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

  useEffect(() => {
    if (instruction && !showTripOverview) {
      Speech.speak(instruction, {
        language: 'de',
      });
    }
  }, [instruction, showTripOverview]);
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

  const reverseDestination = useReverseData();

  const createDestinationPhotonValue = async () => {
    if (tripData.destination) {
      const destinationCoordinates = parseCoordinate(tripData.destination);
      const destinationPhotonFeatureCollection =
        await reverseDestination.mutateAsync({
          lat: destinationCoordinates.lat,
          lon: destinationCoordinates.lon,
        });
      router.replace('/favorites');
      router.push({
        pathname: '/favorites/create',
        params: {
          address: JSON.stringify(
            destinationPhotonFeatureCollection.features[0]
          ),
        },
      });
    }
  };

  const isFinished =
    data &&
    calculatedManeuvers?.maneuverIndex ===
      data.trip.legs[0].maneuvers.length - 1;

  const summary = data && data.trip.summary;
  const convertSecondsToMinutes = (seconds: number | undefined) => {
    if (!seconds) return 0;

    return Math.floor(seconds / 60);
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

  if (data && showTripOverview) {
    return (
      <RouteOverview
        onCloseClick={() => setShowTripOverview(false)}
        summary={data.trip.summary}
      />
    );
  }

  if (isFinished) {
    return (
      <SafeAreaView className="flex-1 bg-background">
        <BigHeader classes="text-invertedPrimary">Geschafft</BigHeader>
        <View className="flex-1 px-8 my-8">
          <Card
            icon={
              <Flag
                fill={themes.external[`--${theme}-mode-primary`]}
                width={150}
                height={150}
              />
            }
          >
            Ziel erreicht !
          </Card>
        </View>

        <View className="mx-5 mb-5">
          <Button
            onPress={createDestinationPhotonValue}
            buttonType="accentOutline"
          >
            Zu Favoriten hinzufügen
          </Button>
          <Button onPress={() => router.back()} buttonType="accent">
            Fertig!
          </Button>
        </View>
      </SafeAreaView>
    );
  }

  return data &&
    calculatedManeuvers?.currentManeuver &&
    calculatedManeuvers.maneuverIndex ? (
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

      {pause ? (
        <Card
          icon={
            <Pause
              fill={themes.external[`--${theme}-mode-primary`]}
              width={150}
              height={150}
            />
          }
        >
          Pause !
        </Card>
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
          {/* <Map */}
          {/*  origin={parseCoordinate(tripData.origin)} */}
          {/*  destination={parseCoordinate(tripData.destination)} */}
          {/*  nearestPoint={nearestPoint} */}
          {/*  decodedShape={decodedShape} */}
          {/*  maneuvers={data.trip.legs[0].maneuvers} */}
          {/*  currentManeuverIndex={Number(calculatedManeuvers.maneuverIndex)} */}
          {/* /> */}
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
              calibration={calibration}
            />
            <TripStep
              key="1"
              icon={matchIconType(
                calculatedManeuvers?.currentManeuver.type,
                themes.external[`--${theme}-mode-primary`]
              )}
              instruction={instruction}
            />
          </PagerView>
        </>
      )}

      <View className="m-auto">
        <Text className="py-8 text-accent text-2xl font-generalSansSemi">
          {summary?.length} km, {convertSecondsToMinutes(summary?.time)} Minuten
        </Text>
      </View>
      <View className="flex flex-row justify-evenly">
        <IconButton
          onPress={createCurrentLocationMessage}
          buttonType="primaryOutline"
          iconName="Akuteller Standort"
          icon={
            <Location
              fill={themes.external[`--${theme}-mode-primary`]}
              width={50}
              height={50}
            />
          }
          classes="m-0"
        />
        <IconButton
          onPress={() => setPause(!pause)}
          buttonType="primary"
          iconName={pause ? 'Weiter' : 'Pause'}
          icon={
            pause ? (
              <Play
                fill={themes.external[`--${theme}-mode-icon-button`]}
                width={50}
                height={50}
              />
            ) : (
              <Pause
                fill={themes.external[`--${theme}-mode-icon-button`]}
                width={50}
                height={50}
              />
            )
          }
          classes="m-0"
        />
        <IconButton
          onPress={() => setShowPopUp(true)}
          buttonType="primary"
          iconName="Beenden"
          icon={
            <Close
              fill={themes.external[`--${theme}-mode-icon-button`]}
              width={50}
              height={50}
            />
          }
          classes="m-0"
        />
      </View>
    </SafeAreaView>
  ) : (
    <Error error="No data found" />
  );
}
