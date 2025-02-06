import { lineString, point } from '@turf/helpers';
import length from '@turf/length';
import lineSlice from '@turf/line-slice';
import nearestPointOnLine from '@turf/nearest-point-on-line';
import * as Speech from 'expo-speech';
import React, { forwardRef, useContext, useRef, useState } from 'react';
import PagerView from 'react-native-pager-view';

import { themes } from '@/colors';
import { ThemeContext } from '@/components/ThemeProvider';
import { NavigationMap } from '@/components/organisms/NavigationMap';
import { TabBar } from '@/components/organisms/TabBar';
import { IsFinished } from '@/components/trip/IsFinished';
import { TripList } from '@/components/trip/TripList';
import { TripStep } from '@/components/trip/TripStep';
import { TripSummary } from '@/components/trip/TripSummary';
import { decodePolyline } from '@/functions/decodePolyline';
import { getMatchingManeuverIndex } from '@/functions/getMatchingManeuvers';
import { matchIconType } from '@/functions/matchIconType';
import { useCurrentLocationStore } from '@/store/useCurrentLocationStore';
import { ValhallaProps } from '@/types/Valhalla-Types';

interface NavigationProps {
  data: ValhallaProps;
  calibrationFactor: number | null;
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
    { data, calibrationFactor }: NavigationProps,
    ref: React.ForwardedRef<PagerView>
  ) => {
    const [showMap, setMap] = useState(false);
    const { trip } = data;
    const { theme } = useContext(ThemeContext);
    const readRef = useRef<ReadRefProps>({});
    const decodedShape = decodePolyline(trip.legs[0].shape);
    const line = lineString(decodedShape.coordinates);
    const currentLocation = useCurrentLocationStore(
      (state) => state.currentLocation
    );

    const currentManeuverRef = useRef<string | null>(null);
    const { updateCurrentLocation } = useCurrentLocationStore(
      (state) => state.actions
    );

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

    const replaceMetersWithSteps = (instruction: string) => {
      if (!calibrationFactor) return instruction; // Early return if calibrationFactor is not provided

      return instruction.replace(/(\d+)\s*Meter/, (_, number) => {
        const newNumber = Math.trunc(Number(number) / calibrationFactor);

        return `${newNumber} Schritte`;
      });
    };

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
        const stepInstruction = replaceMetersWithSteps(
          maneuvers[0]?.instruction ?? ''
        );
        Speech.speak(`${stepInstruction}`, {
          language: 'de',
        });
        currentManeuverRef.current = maneuvers[0]?.instruction ?? null;
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

      const nextManeuverThreshold = maneuverLength() / 3;

      if (
        lengthFromCurrentPositionToNextManeuver() < nextManeuverThreshold &&
        readRef.current[currentManeuverIndex]
          ?.verbal_transition_alert_instruction === undefined &&
        verbal_transition_alert_instruction !== undefined
      ) {
        const maneuver = `In ${Math.trunc(lengthFromCurrentPositionToNextManeuver())} ${calibrationFactor ? 'Schritten' : 'Meter'} ${verbal_transition_alert_instruction}`;

        Speech.speak(maneuver, {
          language: 'de',
        });
        currentManeuverRef.current = maneuver;
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
        const stepInstruction = replaceMetersWithSteps(
          verbal_pre_transition_instruction
        );

        Speech.speak(`${stepInstruction ?? ''}`, {
          language: 'de',
        });
        currentManeuverRef.current = verbal_pre_transition_instruction;
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
        const stepInstruction = replaceMetersWithSteps(
          verbal_post_transition_instruction
        );

        Speech.speak(`${stepInstruction ?? ''}`, {
          language: 'de',
        });
        currentManeuverRef.current = verbal_post_transition_instruction;
        readRef.current[currentManeuverIndex] = {
          ...readRef.current[currentManeuverIndex],
          verbal_post_transition_instruction,
        };
      }
    }

    const newLine = decodedShape?.coordinates.slice(snapshot?.properties.index);

    if (newLine && newLine.length > 0 && snapshot) {
      const [x, y] = snapshot.geometry.coordinates;
      newLine[0] = [x, y];
    }

    if (isFinished) {
      return <IsFinished />;
    }

    return (
      <>
        {showMap ? (
          <NavigationMap
            origin={[trip.locations[0].lat, trip.locations[0].lon]}
            destination={[trip.locations[1].lat, trip.locations[1].lon]}
            snapshot={snapshot}
            newLine={newLine}
            decodedShape={decodedShape}
            currentLocation={currentLocation}
            updateCurrentLocation={updateCurrentLocation}
          />
        ) : (
          <TabBar
            firstTabButtonText="Übersicht"
            secondTabButtonText="Navigation"
          >
            <TripList
              maneuvers={trip.legs[0].maneuvers.slice(
                !currentManeuverIndex ? 0 : currentManeuverIndex
              )}
              key="0"
              calibrationFactor={calibrationFactor}
            />
            <TripStep
              key="1"
              instruction={
                currentManeuverRef.current ?? maneuvers[0]?.instruction
              }
              icon={
                currentManeuverIndex !== undefined &&
                matchIconType(
                  maneuvers[currentManeuverIndex].type,
                  themes.external[`--${theme}-mode-primary`]
                )
              }
            />
          </TabBar>
        )}

        <TripSummary
          length={length(lineString(newLine))}
          summary={data.trip.summary}
          onPressMap={() => setMap((prevState) => !prevState)}
          setIconButton="primaryOutline"
        />
      </>
    );
  }
);
