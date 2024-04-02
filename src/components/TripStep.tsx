import { router } from 'expo-router';
import React from 'react';
import { SafeAreaView, ScrollView, Text } from 'react-native';

import { Button } from '@/components/atoms/Button';
import { ListItem } from '@/components/atoms/ListItem';
import { getCalibrationValue } from '@/functions/getCalibrationValue';
import { tripInstructionOutput } from '@/functions/tripInstructionOutput';
import { useCalibrationStore } from '@/store/useCalibrationStore';
import { useCurrentLocationStore } from '@/store/useCurrentLocationStore';
import { TripProps } from '@/types/Valhalla-Types';

export function TripStep({ data }: { data: TripProps }) {
  const currentLocation = useCurrentLocationStore(
    (state) => state.currentLocation
  );
  const calibration = useCalibrationStore((state) => state.calibration);

  // const [currentManeuver, setCurrentManeuver] = React.useState(0);
  const factor = getCalibrationValue(calibration.factors);

  // let decodedShape: {
  //   result: number;
  //   lng: number;
  //   byte: null | number;
  //   shift: number;
  //   coordinates: [number, number][];
  //   index: number;
  //   factor: number;
  //   lat: number;
  // };
  if (currentLocation && data) {
    // decodedShape = decodePolyline(data..shape);
    // const startLat =
    //   decodedShape.coordinates[data[currentManeuver + 1].begin_shape_index][0];
    // const startLon =
    //   decodedShape.coordinates[data[currentManeuver + 1].begin_shape_index][1];
    //
    // const currentLat = currentLocation.coords.latitude;
    // const currentLon = currentLocation.coords.longitude;
    // const distanceChange =
    //   distance(startLat, startLon, currentLat, currentLon) * 1000;
    //
    // if (distanceChange < 5) {
    //   setCurrentManeuver((prevState) => prevState + 1);
    // }
  }

  let maneuverValue = '';

  if (data) {
    const maneuver = data.legs[0].maneuvers[0];
    maneuverValue = tripInstructionOutput(maneuver, factor);
  }

  return (
    <SafeAreaView className="flex-1">
      <ScrollView className="mx-5 my-5">
        {maneuverValue.length > 0 && data && currentLocation && (
          <ListItem
            key={
              data.legs[0].maneuvers[0].begin_shape_index +
              data.legs[0].maneuvers[0].end_shape_index
            }
          >
            {maneuverValue}
          </ListItem>
        )}
        <Button onPress={() => router.back()} buttonType="secondary">
          <Text>Beenden</Text>
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
}
