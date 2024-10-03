import distance from '@turf/distance';
import { lineString, point } from '@turf/helpers';
import nearestPointOnLine from '@turf/nearest-point-on-line';
import * as Speech from 'expo-speech';
import React, { forwardRef, useContext, useRef } from 'react';
import { NativeSyntheticEvent, StyleSheet } from 'react-native';
import PagerView from 'react-native-pager-view';

import { themes } from '@/colors';
import { ThemeContext } from '@/components/ThemeProvider';
import { Map } from '@/components/organisms/Map';
import { IsFinished } from '@/components/trip/IsFinished';
import { TripList } from '@/components/trip/TripList';
import { TripStep } from '@/components/trip/TripStep';
import { decodePolyline } from '@/functions/decodePolyline';
import { getMatchingManeuverIndex } from '@/functions/getMatchingManeuvers';
import { matchIconType } from '@/functions/matchIconType';
import { useCalibrationStore } from '@/store/useCalibrationStore';
import { useCurrentLocationStore } from '@/store/useCurrentLocationStore';
import { TripProps } from '@/types/Valhalla-Types';

const styles = StyleSheet.create({
  pager: {
    flex: 1,
    alignSelf: 'stretch',
  },
});
interface NavigationProps {
  trip: TripProps;
  handlePageSelected: (
    event: NativeSyntheticEvent<Readonly<{ position: number }>>
  ) => void;
  activePage: number;
}
interface ReadRefProps {
  [key: number]: {
    verbal_transition_alert_instruction?: string;
    verbal_pre_transition_instruction?: string;
    verbal_post_transition_instruction?: string;
  };
}
export const Navigation = forwardRef(
  (
    { trip, activePage, handlePageSelected }: NavigationProps,
    ref: React.ForwardedRef<PagerView>
  ) => {
    const { theme } = useContext(ThemeContext);
    const readRef = useRef<ReadRefProps>();
    const decodedShape = decodePolyline(trip.legs[0].shape);
    const line = lineString(decodedShape.coordinates);
    const currentLocation = useCurrentLocationStore(
      (state) => state.currentLocation
    );
    const calibration = useCalibrationStore((state) => state.calibration);
    const currentLocationPoint =
      currentLocation &&
      point([
        currentLocation.coords.latitude,
        currentLocation.coords.longitude,
      ]);

    const nearestPoint =
      currentLocationPoint && nearestPointOnLine(line, currentLocationPoint);

    const { maneuvers } = trip.legs[0];
    const currentManeuverIndex =
      nearestPoint && getMatchingManeuverIndex(trip, nearestPoint);
    const isFinished =
      currentManeuverIndex === trip.legs[0].maneuvers.length - 1;
    if (
      maneuvers &&
      currentManeuverIndex !== undefined &&
      currentManeuverIndex !== null &&
      nearestPoint?.properties.location &&
      decodedShape
    ) {
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
            verbal_transition_alert_instruction:
              verbalTransitionAlertInstruction,
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
    if (isFinished) {
      return <IsFinished />;
    }

    return (
      <>
        <Map
          origin={decodedShape.coordinates[0]}
          destination={
            decodedShape.coordinates[decodedShape.coordinates.length - 1]
          }
          nearestPoint={nearestPoint}
          decodedShape={decodedShape}
          maneuvers={trip.legs[0].maneuvers}
          currentManeuverIndex={currentManeuverIndex}
        />
        <PagerView
          onPageSelected={(event) => handlePageSelected(event)}
          initialPage={activePage}
          style={styles.pager}
          ref={ref}
        >
          <TripList
            maneuvers={trip.legs[0].maneuvers.slice(currentManeuverIndex)}
            key="0"
            calibration={calibration}
          />
          <TripStep
            key="1"
            icon={
              currentManeuverIndex &&
              matchIconType(
                maneuvers[currentManeuverIndex].type,
                themes.external[`--${theme}-mode-primary`]
              )
            }
          />
        </PagerView>
      </>
    );
  }
);
