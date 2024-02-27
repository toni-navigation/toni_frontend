import React from 'react';
import { View } from 'react-native';
import Trip from '../src/pages/Trip';
import useUserStore from '../store/useUserStore';

export default function TripPage() {
  const { trip, calibration } = useUserStore();

  return (
    trip &&
    trip.trip && (
      <View>
        {trip.trip.legs[0].maneuvers.map((maneuver) => (
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
