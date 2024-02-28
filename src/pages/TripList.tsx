import React from 'react';
import { Text, View } from 'react-native';
import { ValhallaManeuverProps } from '../../types/Valhalla-Types';
import decodePolyline from '../functions/decodePolyline';
import useUserStore from '../../store/useUserStore';

interface TripList {
  maneuver: ValhallaManeuverProps;
  factor?: number | null;
}
function TripList({ factor, maneuver }: TripList) {
  const { trip, calibration, currentLocation } = useUserStore();
  const tripText = `${maneuver.instruction} ${maneuver.length * 1000} Meter`;
  let decodedShape;
  if (trip) {
    decodedShape = decodePolyline(trip?.trip.legs[0].shape);
    //console.log(decodedShape.coordinates[maneuver.begin_shape_index]);
  }

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

export default TripList;
