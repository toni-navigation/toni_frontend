import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import Trip from '../src/pages/Trip';
import { LocationType } from '../types/Types';
import useUserStore from '../store/useUserStore';
import useTrip from '../src/functions/queries';

export default function CalibrationPage() {
  const { calibration, points } = useUserStore();
  const startAndDestination: (LocationType | undefined)[] = [
    points.start.location,
    points.destination.location,
  ];
  const { isPending, error, data } = useTrip(startAndDestination);

  if (isPending) {
    return <ActivityIndicator size="large" />;
  }
  if (error) {
    return (
      <View>
        <Text>Error loading Trip</Text>
      </View>
    );
  }
  return (
    data &&
    data.trip && (
      <View>
        {data.trip.legs[0].maneuvers.map((maneuver) => (
          <Trip
            key={maneuver.begin_shape_index + maneuver.end_shape_index}
            maneuver={maneuver}
            factor={calibration.factor}
          />
        ))}
      </View>
    )
  );
}
