import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import Trip from '../src/pages/Trip';
import useUserStore from '../store/useUserStore';
import useTrip from '../src/functions/queries';

export default function TripPage() {
  const { calibration, points, currentLocation } = useUserStore();
  const start = {
    lat: currentLocation?.coords.latitude,
    lon: currentLocation?.coords.longitude,
  };
  const startAndDestination = [start, points.destination.location];
  const { isPending, error, data } = useTrip(startAndDestination);

  if (isPending) {
    return <ActivityIndicator size="large" />;
  }
  if (error) {
    return (
      <View>
        <Text>Error loading Trip</Text>
        <Text>{error.message}</Text>
      </View>
    );
  }
  return (
    data &&
    data.trip && (
      <View>
        <Text>{JSON.stringify(currentLocation)}</Text>
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
