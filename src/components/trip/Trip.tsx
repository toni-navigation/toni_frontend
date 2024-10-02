import distance from '@turf/distance';
import { lineString, point } from '@turf/helpers';
import nearestPointOnLine from '@turf/nearest-point-on-line';
import { router, useLocalSearchParams } from 'expo-router';
import * as Speech from 'expo-speech';
import React, { useContext, useRef } from 'react';
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
import { Flag } from '@/components/atoms/icons/Flag';
import { Pause } from '@/components/atoms/icons/Pause';
import { AlertBar } from '@/components/organisms/AlertBar';
import { Card } from '@/components/organisms/Card';
import { Error } from '@/components/organisms/Error';
import { Map } from '@/components/organisms/Map';
import { PopUp } from '@/components/organisms/PopUp';
import { RouteOverview } from '@/components/organisms/RouteOverview';
import { TripList } from '@/components/trip/TripList';
import { TripStep } from '@/components/trip/TripStep';
import { decodePolyline } from '@/functions/decodePolyline';
import { getCalibrationValue } from '@/functions/getCalibrationValue';
import { getMatchingManeuverIndex } from '@/functions/getMatchingManeuvers';
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
interface ReadRefProps {
  [key: number]: {
    verbal_transition_alert_instruction?: string;
    verbal_pre_transition_instruction?: string;
    verbal_post_transition_instruction?: string;
  };
}
const ACCURACY_THRESHOLD = 10;
export function Trip() {
  const { theme } = useContext(ThemeContext);
  const ref = React.useRef<PagerView>();
  const readRef = useRef<ReadRefProps>();
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
  const maneuvers = data && data.trip.legs[0].maneuvers;
  const currentManeuverIndex =
    data && nearestPoint && getMatchingManeuverIndex(data, nearestPoint);
  if (
    maneuvers &&
    currentManeuverIndex !== undefined &&
    currentManeuverIndex !== null &&
    nearestPoint?.properties.location &&
    decodedShape
  ) {
    const startShapeCoordinate =
      maneuvers[currentManeuverIndex - 1].begin_shape_index;
    const endShapeCoordinate =
      maneuvers[currentManeuverIndex].begin_shape_index;
    const distanceLocationAndEndShape =
      endShapeCoordinate &&
      distance(
        nearestPoint.geometry.coordinates,
        decodedShape?.coordinates[endShapeCoordinate]
      ) * 1000;

    const verbalTransitionAlertInstruction =
      maneuvers[currentManeuverIndex]?.verbal_transition_alert_instruction;
    const verbalPreTransitionInstruction =
      maneuvers[currentManeuverIndex]?.verbal_pre_transition_instruction;
    const verbalPostTransitionInstruction =
      maneuvers[currentManeuverIndex]?.verbal_post_transition_instruction;

    if (
      distanceLocationAndEndShape !== undefined &&
      distanceLocationAndEndShape < 20
    ) {
      // if (readRef.current === null || readRef.current === undefined) {
      //   readRef.current = {};
      //   Speech.speak(verbalTransitionAlertInstruction ?? '', {
      //     language: 'de',
      //   });
      // }
      console.log(JSON.stringify(readRef.current));

      if (
        readRef.current === undefined ||
        readRef.current[currentManeuverIndex] === undefined ||
        readRef.current[currentManeuverIndex]
          ?.verbal_transition_alert_instruction === undefined
      ) {
        if (verbalTransitionAlertInstruction !== undefined) {
          Speech.speak(`In 20 Metern ${verbalTransitionAlertInstruction}`, {
            language: 'de',
          });
        }
        if (readRef.current === undefined) {
          readRef.current = {};
        }
        readRef.current[currentManeuverIndex] = {
          verbal_transition_alert_instruction: verbalTransitionAlertInstruction,
        };
      }
      if (
        distanceLocationAndEndShape < 5 &&
        readRef.current[currentManeuverIndex]
          ?.verbal_pre_transition_instruction === undefined &&
        readRef.current[currentManeuverIndex]
          ?.verbal_post_transition_instruction === undefined
      ) {
        if (
          verbalPreTransitionInstruction !== undefined ||
          verbalPostTransitionInstruction !== undefined
        ) {
          Speech.speak(
            `${verbalPreTransitionInstruction ?? ''} und ${verbalPostTransitionInstruction ?? ''}` ??
              '',
            {
              language: 'de',
            }
          );
        }
        readRef.current[currentManeuverIndex] = {
          ...readRef.current[currentManeuverIndex],
          verbal_pre_transition_instruction: verbalPreTransitionInstruction,
          verbal_post_transition_instruction: verbalPostTransitionInstruction,
        };
      }

      // const verbalPreTransitionInstruction =
      //   maneuvers[currentManeuverIndex]?.verbal_pre_transition_instruction ??
      //   '';
      // const verbalPostTransitionInstruction =
      //   maneuvers[currentManeuverIndex]?.verbal_post_transition_instruction ??
      //   '';
    }
  }

  // const indices = decodedShape?.coordinates
  //   .map((coordinate, index) =>
  //     maneuvers?.find((maneuver) => maneuver.begin_shape_index === index)
  //       ? index
  //       : undefined
  //   )
  //   .filter((index) => index !== undefined);
  // const maneuverCoordinates = indices?.map(
  //   (index) => index && decodedShape?.coordinates[index]
  // );
  // console.log(decodedShape?.coordinates, indices, maneuverCoordinates);
  // console.log(
  //   maneuvers[currentManeuverIndex].begin_shape_index,
  //   maneuvers[currentManeuverIndex].end_shape_index,
  //   maneuvers &&
  //     currentManeuverIndex !== undefined &&
  //     decodedShape?.coordinates[
  //       maneuvers[currentManeuverIndex].end_shape_index
  //     ]
  // );
  // const startShapeCoordinate =
  //   maneuvers &&
  //   currentManeuverIndex !== undefined &&
  //   decodedShape?.coordinates[
  //     maneuvers[currentManeuverIndex - 1].begin_shape_index
  //   ];
  // const endShapeCoordinate =
  //   maneuvers &&
  //   currentManeuverIndex !== undefined &&
  //   decodedShape?.coordinates[
  //     maneuvers[currentManeuverIndex - 1].end_shape_index
  //   ];
  // const distanceToPreviousManeuver =
  //   nearestPoint &&
  //   distance(
  //     nearestPoint,
  //     point([startShapeCoordinate[0], startShapeCoordinate[1]])
  //   ) * 1000;
  //
  // console.log(distanceToPreviousManeuver);
  // console.log(
  //   distance(
  //     nearestPoint,
  //     point([startShapeCoordinate[0], startShapeCoordinate[1]])
  //   ) * 1000,
  //   distance(
  //     nearestPoint,
  //     point([endShapeCoordinate[0], endShapeCoordinate[1]])
  //   ) * 1000
  // );
  // const postInstruction =
  //   data &&
  //   maneuvers &&
  //   typeof currentManeuverIndex === 'number' &&
  //   maneuvers[currentManeuverIndex].verbal_post_transition_instruction;
  const instruction =
    data &&
    maneuvers &&
    typeof currentManeuverIndex === 'number' &&
    tripInstructionOutput(maneuvers[currentManeuverIndex], factor);
  // useEffect(() => {
  //   if (postInstruction) {
  //     Speech.speak(postInstruction, {
  //       language: 'de',
  //     });
  //   }
  // }, [currentManeuverIndex, postInstruction]);
  // useEffect(() => {
  //   if (instruction && !showTripOverview) {
  //     Speech.speak(instruction, {
  //       language: 'de',
  //     });
  //   }
  // }, [instruction, showTripOverview]);

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
    data && currentManeuverIndex === data.trip.legs[0].maneuvers.length - 1;

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
    maneuvers &&
    currentManeuverIndex &&
    maneuvers[currentManeuverIndex] ? (
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
          {/* <TabBar */}
          {/*  setPage={(page) => ref.current?.setPage(page)} */}
          {/*  activePage={activePage} */}
          {/* /> */}
          <Map
            origin={parseCoordinate(tripData.origin)}
            destination={parseCoordinate(tripData.destination)}
            nearestPoint={nearestPoint}
            decodedShape={decodedShape}
            maneuvers={data.trip.legs[0].maneuvers}
            currentManeuverIndex={currentManeuverIndex}
          />
          <PagerView
            onPageSelected={(event) => handlePageSelected(event)}
            initialPage={activePage}
            style={styles.pager}
            ref={ref}
          >
            <TripList
              maneuvers={data.trip.legs[0].maneuvers.slice(
                currentManeuverIndex
              )}
              key="0"
              calibration={calibration}
            />
            <TripStep
              key="1"
              icon={matchIconType(
                maneuvers[currentManeuverIndex].type,
                themes.external[`--${theme}-mode-primary`]
              )}
              instruction={instruction}
            />
          </PagerView>
        </>
      )}

      {/* <View className="m-auto"> */}
      {/*  <Text className="py-8 text-accent text-2xl font-generalSansSemi"> */}
      {/*    {summary?.length} km, {convertSecondsToMinutes(summary?.time)} Minuten */}
      {/*  </Text> */}
      {/* </View> */}
      {/* <View className="flex flex-row justify-evenly"> */}
      {/*  <IconButton */}
      {/*    onPress={createCurrentLocationMessage} */}
      {/*    buttonType="primaryOutline" */}
      {/*    iconName="Akuteller Standort" */}
      {/*    size={4} */}
      {/*    icon={ */}
      {/*      <Location */}
      {/*        fill={themes.external[`--${theme}-mode-primary`]} */}
      {/*        width={50} */}
      {/*        height={50} */}
      {/*      /> */}
      {/*    } */}
      {/*    classes="m-0" */}
      {/*  /> */}
      {/*  <IconButton */}
      {/*    onPress={() => setPause(!pause)} */}
      {/*    buttonType="primary" */}
      {/*    iconName={pause ? 'Weiter' : 'Pause'} */}
      {/*    size={4} */}
      {/*    icon={ */}
      {/*      pause ? ( */}
      {/*        <Play */}
      {/*          fill={themes.external[`--${theme}-mode-icon-button`]} */}
      {/*          width={50} */}
      {/*          height={50} */}
      {/*        /> */}
      {/*      ) : ( */}
      {/*        <Pause */}
      {/*          fill={themes.external[`--${theme}-mode-icon-button`]} */}
      {/*          width={50} */}
      {/*          height={50} */}
      {/*        /> */}
      {/*      ) */}
      {/*    } */}
      {/*    classes="m-0" */}
      {/*  /> */}
      {/*  <IconButton */}
      {/*    onPress={() => setShowPopUp(true)} */}
      {/*    buttonType="primary" */}
      {/*    iconName="Beenden" */}
      {/*    size={4} */}
      {/*    icon={ */}
      {/*      <Close */}
      {/*        fill={themes.external[`--${theme}-mode-icon-button`]} */}
      {/*        width={50} */}
      {/*        height={50} */}
      {/*      /> */}
      {/*    } */}
      {/*    classes="m-0" */}
      {/*  /> */}
      {/* </View> */}
    </SafeAreaView>
  ) : (
    <Error error="No data found" />
  );
}
