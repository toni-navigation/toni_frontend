import { lineString, point } from '@turf/helpers';
import length from '@turf/length';
import lineSlice from '@turf/line-slice';
import nearestPointOnLine from '@turf/nearest-point-on-line';
import * as Speech from 'expo-speech';
import React, { forwardRef, useContext, useRef } from 'react';
import { NativeSyntheticEvent, StyleSheet } from 'react-native';
import PagerView from 'react-native-pager-view';

import { themes } from '@/colors';
import { ThemeContext } from '@/components/ThemeProvider';
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
    instruction?: string;
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
    const readRef = useRef<ReadRefProps>({});
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

    const snapshot =
      currentLocationPoint && nearestPointOnLine(line, currentLocationPoint);

    const { maneuvers } = trip.legs[0];

    const currentManeuverIndex =
      snapshot && getMatchingManeuverIndex(trip, snapshot);
    const isFinished =
      currentManeuverIndex === trip.legs[0].maneuvers.length - 1;
    if (snapshot !== undefined && currentManeuverIndex !== undefined) {
      const {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        verbal_pre_transition_instruction,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        verbal_transition_alert_instruction,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        verbal_post_transition_instruction,
      } = maneuvers[currentManeuverIndex];
      if (currentManeuverIndex === 1 && readRef.current[0] === undefined) {
        Speech.speak(`${maneuvers[0]?.instruction ?? ''}`, {
          language: 'de',
        });
        readRef.current[0] = {
          instruction: maneuvers[0].instruction,
        };
      }
      const sliced = lineSlice(
        snapshot,
        decodedShape.coordinates[
          maneuvers[currentManeuverIndex - 1].end_shape_index
        ],
        line
      );
      const lengthFromCurrentPositionToNextManeuver = length(sliced) * 1000;
      const maneuverLength = maneuvers[currentManeuverIndex - 1].length * 1000;
      const nextManeuverThreshold = maneuverLength / 3;

      if (
        lengthFromCurrentPositionToNextManeuver < nextManeuverThreshold &&
        readRef.current[currentManeuverIndex]
          ?.verbal_transition_alert_instruction === undefined &&
        verbal_transition_alert_instruction !== undefined
      ) {
        Speech.speak(
          `In ${lengthFromCurrentPositionToNextManeuver.toFixed(2)} Metern ${verbal_transition_alert_instruction}`,
          {
            language: 'de',
          }
        );
        readRef.current[currentManeuverIndex] = {
          verbal_transition_alert_instruction,
        };
      }
      if (
        lengthFromCurrentPositionToNextManeuver < 5 &&
        verbal_pre_transition_instruction !== undefined &&
        readRef.current[currentManeuverIndex]
          ?.verbal_pre_transition_instruction === undefined
      ) {
        Speech.speak(`${verbal_pre_transition_instruction ?? ''}`, {
          language: 'de',
        });

        readRef.current[currentManeuverIndex] = {
          ...readRef.current[currentManeuverIndex],
          verbal_pre_transition_instruction,
        };
      }
      if (
        lengthFromCurrentPositionToNextManeuver < 5 &&
        verbal_post_transition_instruction !== undefined &&
        readRef.current[currentManeuverIndex]
          ?.verbal_post_transition_instruction === undefined
      ) {
        Speech.speak(`${verbal_post_transition_instruction ?? ''}`, {
          language: 'de',
        });

        readRef.current[currentManeuverIndex] = {
          ...readRef.current[currentManeuverIndex],
          verbal_post_transition_instruction,
        };
      }
    }

    if (isFinished) {
      return <IsFinished />;
    }

    return (
      <>
        {/* <Map */}
        {/*  // sliced={sliced} */}
        {/*  origin={decodedShape.coordinates[0]} */}
        {/*  destination={ */}
        {/*    decodedShape.coordinates[decodedShape.coordinates.length - 1] */}
        {/*  } */}
        {/*  snapshot={snapshot} */}
        {/*  decodedShape={decodedShape} */}
        {/*  maneuvers={trip.legs[0].maneuvers} */}
        {/*  currentManeuverIndex={currentManeuverIndex} */}
        {/* /> */}
        <PagerView
          onPageSelected={(event) => handlePageSelected(event)}
          initialPage={activePage}
          style={styles.pager}
          ref={ref}
        >
          <TripList
            maneuvers={trip.legs[0].maneuvers.slice(
              !currentManeuverIndex ? 0 : currentManeuverIndex - 1
            )}
            key="0"
            calibration={calibration}
          />
          <TripStep
            key="1"
            instruction={
              currentManeuverIndex !== undefined
                ? maneuvers[currentManeuverIndex]?.instruction
                : undefined
            }
            icon={
              currentManeuverIndex !== undefined &&
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
