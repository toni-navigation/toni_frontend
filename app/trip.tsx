import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import Trip from '../src/pages/Trip';
import { LocationType } from '../types/Types';
import { fetchTripHandler } from '../src/functions/fetch';
import useUserStore from '../store/useUserStore';

export default function CalibrationPage() {
  const { trip, calibration, points, actions } = useUserStore();

  useEffect(() => {
    (async () => {
      const startAndDestination: LocationType[] = [
        points.start.location,
        points.destination.location,
      ];
      const newTrip = await fetchTripHandler(startAndDestination);
      if (newTrip) {
        actions.setTrip(newTrip);
      }
    })();
  }, [actions, actions.setTrip, points]);
  return trip ? (
    <View>
      {trip.trip.legs[0].maneuvers.map((maneuver) => (
        <Trip
          key={maneuver.begin_shape_index + maneuver.end_shape_index}
          maneuver={maneuver}
          factor={calibration.factor}
        />
      ))}
    </View>
  ) : (
    <View>
      <Text>Loading</Text>
    </View>
  );
}
