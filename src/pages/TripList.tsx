import React from 'react';
import { Text, View } from 'react-native';
import { ValhallaManeuverProps } from '../../types/Valhalla-Types';

interface TripList {
  maneuver: ValhallaManeuverProps;
  factor?: number | null;
}
function TripList({ factor, maneuver }: TripList) {
  const tripText = `${maneuver.instruction} ${maneuver.length * 1000} Meter`;

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
