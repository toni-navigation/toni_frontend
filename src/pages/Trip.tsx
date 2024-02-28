import React from 'react';
import { Text, View } from 'react-native';
import { ValhallaManeuverProps } from '../../types/Valhalla-Types';
import MapView, { Polyline } from 'react-native-maps';

interface Trip {
  maneuver: ValhallaManeuverProps;
  factor?: number | null;
}
function Trip({ factor, maneuver }: Trip) {
  const tripText = `${maneuver.instruction} ${maneuver.length * 1000} Meter`;
  return (
    <View className="border-b-2">
      <Text>{tripText}</Text>
      {/*factor && (
        <Text>
          Umgerechnet in Schritte:{' '}
          {Math.ceil((maneuver.length * 1000) / factor)} Schritte
        </Text>
      )*/}
    </View>
  );
}

export default Trip;
