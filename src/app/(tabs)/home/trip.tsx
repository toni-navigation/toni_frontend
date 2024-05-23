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

import { TripList } from '@/components/TripList';
import { TripStep } from '@/components/TripStep';
import { Button } from '@/components/atoms/Button';
import { Icon } from '@/components/atoms/Icon';
import { Card } from '@/components/organisms/Card';
import { Error } from '@/components/organisms/Error';
import { PopUp } from '@/components/organisms/PopUp';
import { TabBar } from '@/components/organisms/TabBar';
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
const THRESHOLD_MAXDISTANCE_FALLBACK_IN_METERS = 20;
const THRESHOLD_REROUTING = 100;

export default function TripPage() {
  const colorscheme = useColorScheme();

  const ref = React.useRef<PagerView>(null);
  const tripData = useLocalSearchParams() as SearchParamType;
  const [activePage, setActivePage] = React.useState(0);
  const [pause, setPause] = React.useState(false);
  const [showPopUp, setShowPopUp] = React.useState(false);
  const [navigateBack, setNavigateBack] = React.useState(false);

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

    // Evtl andere Lösung?
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

  const line = decodedShape && lineString(decodedShape.coordinates);

  const nearestPoint =
    line &&
    currentLocationPoint &&
    nearestPointOnLine(line, currentLocationPoint);
  const factor = getCalibrationValue(calibration.factors);
  const calculatedManeuvers =
    data && nearestPoint && getMatchingManeuvers(data, nearestPoint);

  let instruction =
    data &&
    calculatedManeuvers?.currentManeuver &&
    tripInstructionOutput(calculatedManeuvers.currentManeuver, factor);
  if (
    nearestPoint &&
    nearestPoint.properties.dist &&
    nearestPoint.properties.dist * 1000 >
      THRESHOLD_MAXDISTANCE_FALLBACK_IN_METERS
  ) {
    instruction = 'Bitte gehe wieder auf die Route.';
  }
  useEffect(() => {
    if (instruction) {
      Speech.speak(instruction, {
        language: 'de',
      });
    }
  }, [instruction]);
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

  // TODO Gyroscope & Pedometer einbauen
  return data &&
    calculatedManeuvers?.currentManeuver &&
    calculatedManeuvers.maneuverIndex ? (
    <SafeAreaView
      className={`flex-1 ${colorscheme === 'light' ? 'bg-background-light' : 'bg-background-dark'}`}
    >
      <PopUp
        visible={showPopUp}
        onClick={() => {
          setShowPopUp(false);
          setNavigateBack(true);
        }}
        onClickButtonText="Beenden"
        onCloseClick={() => {
          setShowPopUp(false);
        }}
        onCloseButtonText="Schließen"
        onDismiss={() => {
          if (navigateBack) {
            router.back();
          }
        }}
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
            <TripStep key="1">
              {nearestPoint &&
                currentLocation &&
                nearestPoint.properties.dist &&
                nearestPoint.properties.dist * 1000 > THRESHOLD_REROUTING && (
                  <View>
                    <Text>
                      Du befindest dich nicht auf der Route. Möchtest du die
                      Route neu berechnen?
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
              {/* <Map */}
              {/*  origin={parseCoordinate(tripData.origin)} */}
              {/*  destination={parseCoordinate(tripData.destination)} */}
              {/*  nearestPoint={nearestPoint} */}
              {/*  decodedShape={decodedShape} */}
              {/*  maneuvers={data.trip.legs[0].maneuvers} */}
              {/*  currentManeuverIndex={calculatedManeuvers.maneuverIndex} */}
              {/* /> */}
              <Card
                iconKey={matchIconType(
                  calculatedManeuvers?.currentManeuver.type
                )}
              >
                {instruction}
              </Card>
            </TripStep>
          </PagerView>
        </>
      )}

      <View className="mx-5 mb-5">
        <Button
          onPress={() => setPause(!pause)}
          buttonType="primaryOutline"
          disabled={false}
        >
          {pause ? 'Fortsetzen' : 'Pause'}
        </Button>
        <Button
          onPress={() => setShowPopUp(true)}
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
