import React from 'react';
import { Text, View } from 'react-native';
import { ValhallaManeuverProps } from '../../types/Valhalla-Types';
import { CurrentLocationProps, CurrentLocationType } from '../../types/Types';
import { distanceOfLatLon } from '../functions/functions';

interface TripStep {
  maneuver: ValhallaManeuverProps;
  factor?: number | null;
  decodedShape: {
    result: number;
    lng: number;
    byte: null | number;
    shift: number;
    coordinates: [number, number][];
    index: number;
    factor: number;
    lat: number;
  };
  currentLocation: CurrentLocationProps;
}
function TripStep({
  factor,
  maneuver,
  decodedShape,
  currentLocation,
}: TripStep) {
  const tripText = `${maneuver.instruction} ${maneuver.length * 1000} Meter`;
  const startLat = decodedShape.coordinates[maneuver.begin_shape_index][0];
  const startLon = decodedShape.coordinates[maneuver.begin_shape_index][1];
  const currentLat = currentLocation.coords.latitude;
  const currentLon = currentLocation.coords.longitude;
  /*console.log(
    decodedShape.coordinates[maneuver.begin_shape_index],
    {
      lat: currentLocation?.coords.latitude,
      lon: currentLocation?.coords.longitude,
    },
    distanceOfLatLon(startLat, startLon, currentLat, currentLon, 'K') * 1000,
    maneuver.instruction
  );*/
  return (
    <View className="border-b-2">
      <Text>{tripText}</Text>
      {factor && (
        <Text>
          Umgerechnet in Schritte:{' '}
          {Math.ceil((maneuver.length * 1000) / factor)} Schritte
        </Text>
      )}
    </View>
  );
}

export default TripStep;
