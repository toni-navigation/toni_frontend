import { lineString, point } from '@turf/helpers';
import length from '@turf/length';
import lineSlice from '@turf/line-slice';
import nearestPointOnLine from '@turf/nearest-point-on-line';
import * as Speech from 'expo-speech';
import React, { forwardRef, useContext, useRef } from 'react';
import PagerView from 'react-native-pager-view';

import { themes } from '@/colors';
import { ThemeContext } from '@/components/ThemeProvider';
import { NavigationMap } from '@/components/organisms/NavigationMap';
import { TabBar } from '@/components/organisms/TabBar';
import { IsFinished } from '@/components/trip/IsFinished';
import { TripList } from '@/components/trip/TripList';
import { TripStep } from '@/components/trip/TripStep';
import { decodePolyline } from '@/functions/decodePolyline';
import { getMatchingManeuverIndex } from '@/functions/getMatchingManeuvers';
import { matchIconType } from '@/functions/matchIconType';
import { useCurrentLocationStore } from '@/store/useCurrentLocationStore';
import { useUserStore } from '@/store/useUserStore';
import { TripProps } from '@/types/Valhalla-Types';

interface NavigationProps {
  trip: TripProps;
  showMap?: boolean;
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
  ({ trip, showMap }: NavigationProps, ref: React.ForwardedRef<PagerView>) => {
    const { theme } = useContext(ThemeContext);
    const readRef = useRef<ReadRefProps>({});
    const decodedShape = decodePolyline(trip.legs[0].shape);
    const line = lineString(decodedShape.coordinates);
    const currentLocation = useCurrentLocationStore(
      (state) => state.currentLocation
    );

    const { updateCurrentLocation } = useCurrentLocationStore(
      (state) => state.actions
    );
    const calibrationFactor = useUserStore((state) => state.calibrationFactor);

    // const calibrationFactor = useUserStore((state) => state.calibrationFactor);
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
    if (
      snapshot !== undefined &&
      currentManeuverIndex !== undefined &&
      maneuvers[currentManeuverIndex] !== undefined
    ) {
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
      const lengthFromCurrentPositionToNextManeuver = () => {
        if (calibrationFactor) {
          return length(sliced) * 1000 * calibrationFactor;
        }

        return length(sliced) * 1000;
      };
      const maneuverLength = () => {
        if (calibrationFactor) {
          return (
            maneuvers[currentManeuverIndex - 1].length *
            1000 *
            calibrationFactor
          );
        }

        return maneuvers[currentManeuverIndex - 1].length * 1000;
      };
      // const maneuverLength = maneuvers[currentManeuverIndex - 1].length * 1000;
      const nextManeuverThreshold = maneuverLength() / 3;

      if (
        lengthFromCurrentPositionToNextManeuver() < nextManeuverThreshold &&
        readRef.current[currentManeuverIndex]
          ?.verbal_transition_alert_instruction === undefined &&
        verbal_transition_alert_instruction !== undefined
      ) {
        console.log(
          'first',
          `In ${lengthFromCurrentPositionToNextManeuver().toFixed(2)} ${calibrationFactor ? 'Schritte' : 'Meter'} ${verbal_transition_alert_instruction}`
        );
        Speech.speak(
          `In ${lengthFromCurrentPositionToNextManeuver().toFixed(2)} ${calibrationFactor ? 'Schritte' : 'Meter'} ${verbal_transition_alert_instruction}`,
          {
            language: 'de',
          }
        );
        readRef.current[currentManeuverIndex] = {
          verbal_transition_alert_instruction,
        };
      }
      if (
        lengthFromCurrentPositionToNextManeuver() < 5 &&
        verbal_pre_transition_instruction !== undefined &&
        readRef.current[currentManeuverIndex]
          ?.verbal_pre_transition_instruction === undefined
      ) {
        console.log('second', `${verbal_pre_transition_instruction}`);
        Speech.speak(`${verbal_pre_transition_instruction ?? ''}`, {
          language: 'de',
        });

        readRef.current[currentManeuverIndex] = {
          ...readRef.current[currentManeuverIndex],
          verbal_pre_transition_instruction,
        };
      }
      if (
        lengthFromCurrentPositionToNextManeuver() < 5 &&
        verbal_post_transition_instruction !== undefined &&
        readRef.current[currentManeuverIndex]
          ?.verbal_post_transition_instruction === undefined
      ) {
        console.log('third', `${verbal_post_transition_instruction}`);
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

    if (showMap) {
      return (
        <NavigationMap
          origin={[trip.locations[0].lat, trip.locations[0].lon]}
          destination={[trip.locations[1].lat, trip.locations[1].lon]}
          snapshot={snapshot}
          decodedShape={decodedShape}
          currentLocation={currentLocation}
          updateCurrentLocation={updateCurrentLocation}
        />
      );
    }

    const maneuverLength =
      snapshot &&
      currentManeuverIndex &&
      length(
        lineSlice(
          snapshot,
          decodedShape.coordinates[
            maneuvers[currentManeuverIndex - 1].end_shape_index
          ],
          line
        )
      );

    return (
      <TabBar firstTabButtonText="Übersicht" secondTabButtonText="Navigation">
        <TripList
          maneuvers={trip.legs[0].maneuvers.slice(
            !currentManeuverIndex ? 0 : currentManeuverIndex - 1
          )}
          key="0"
          calibrationFactor={calibrationFactor}
        />
        <TripStep
          key="1"
          instruction={
            currentManeuverIndex !== undefined
              ? maneuvers[currentManeuverIndex - 1]?.instruction
              : undefined
          }
          manueverLength={maneuverLength}
          icon={
            currentManeuverIndex !== undefined &&
            matchIconType(
              maneuvers[currentManeuverIndex].type,
              themes.external[`--${theme}-mode-primary`]
            )
          }
          calibrationFactor={calibrationFactor}
        />
      </TabBar>
    );
  }
);
