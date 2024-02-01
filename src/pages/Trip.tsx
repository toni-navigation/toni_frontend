import React from 'react';
import { Text, View } from 'react-native';
import { ValhallaManeuverProps } from '../../types/Valhalla-Types';

interface TripProps {
  maneuver: ValhallaManeuverProps;
  factor: number | null;
}
function Trip({ factor, maneuver }: TripProps) {
  return (
    <View className="border-b-2">
      <Text>
        {maneuver.instruction}, {maneuver.length * 1000} Meter
      </Text>
      {factor && (
        <Text>
          Umgerechnet in Schritte:{' '}
          {Math.ceil((maneuver.length * 1000) / factor)} Schritte
        </Text>
      )}
    </View>
  );
}

export default Trip;
