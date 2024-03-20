import { router } from 'expo-router';
import React from 'react';
import { SafeAreaView, ScrollView, Text } from 'react-native';

import { Button } from '@/components/atoms/Button';
import { ListItem } from '@/components/atoms/ListItem';
import { decodePolyline } from '@/functions/decodePolyline';
import {
  distanceOfLatLon,
  getCalibrationValue,
  valueOutput,
} from '@/functions/functions';
import { useUserStore } from '@/store/useUserStore';
import { TripProps } from '@/types/Valhalla-Types';

export function TripStep({ data }: { data: TripProps }) {
  const { calibration, currentLocation } = useUserStore();

  const [currentManeuver, setCurrentManeuver] = React.useState(0);
  const factor = getCalibrationValue(calibration.factors);

  let decodedShape: {
    result: number;
    lng: number;
    byte: null | number;
    shift: number;
    coordinates: [number, number][];
    index: number;
    factor: number;
    lat: number;
  };
  if (currentLocation && data) {
    decodedShape = decodePolyline(data.legs[0].shape);
    const startLat =
      decodedShape.coordinates[
        data.legs[0].maneuvers[currentManeuver + 1].begin_shape_index
      ][0];
    const startLon =
      decodedShape.coordinates[
        data.legs[0].maneuvers[currentManeuver + 1].begin_shape_index
      ][1];

    const currentLat = currentLocation.coords.latitude;
    const currentLon = currentLocation.coords.longitude;

    const distanceChange =
      distanceOfLatLon(startLat, startLon, currentLat, currentLon, 'K') * 1000;

    if (distanceChange < 5) {
      setCurrentManeuver((prevState) => prevState + 1);
    }
  }

  let maneuverValue = '';

  if (data) {
    const maneuver = data.legs[0].maneuvers[currentManeuver];
    maneuverValue = valueOutput(maneuver, factor);
  }

  return (
    <SafeAreaView className="flex-1">
      <ScrollView className="mx-5 my-5">
        {maneuverValue.length > 0 && data && currentLocation && (
          <ListItem
            key={
              data.legs[0].maneuvers[currentManeuver].begin_shape_index +
              data.legs[0].maneuvers[currentManeuver].end_shape_index
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
