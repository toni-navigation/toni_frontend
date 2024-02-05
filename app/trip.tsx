import React, { useEffect } from 'react';
import { router } from 'expo-router';
import Calibration from '../src/pages/Calibration';
import useCurrentLocationStore from '../store/locationStore';
import useCalibrationStore from '../store/calibrationStore';
import { View, Text } from 'react-native';
import Trip from '../src/pages/Trip';
import useTripStore from '../store/tripStore';
import usePointsStore from '../store/pointsStore';
import { LocationType } from '../types/Types';
import { fetchTripHandler } from '../src/functions/fetch';
import { getCurrentPosition } from '../src/functions/functions';

export default function CalibrationPage() {
  const { trip, setTrip } = useTripStore();
  const { calibration } = useCalibrationStore();
  const { points } = usePointsStore();

  useEffect(() => {
    (async () => {
      const startAndDestination: LocationType[] = [
        points.start.location,
        points.destination.location,
      ];
      const newTrip = await fetchTripHandler(startAndDestination);
      if (newTrip) {
        setTrip(newTrip);
      }
    })();
  }, [setTrip, points]);
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
