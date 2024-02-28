import React from 'react';
import { Text, View } from 'react-native';
import Trip from '../src/pages/Trip';
import useUserStore from '../store/useUserStore';
import decodePolyline from '../src/functions/decodePolyline';
import MapView, { Polyline } from 'react-native-maps';

export default function TripPage() {
  const { trip, calibration, currentLocation } = useUserStore();
  let decodedPolyline;
  let polylineCoordinates;
  if (trip) {
    decodedPolyline = decodePolyline(trip?.trip.legs[0].shape);
    polylineCoordinates = decodedPolyline.coordinates.map((coordinate) => ({
      latitude: coordinate[0],
      longitude: coordinate[1],
    }));
  }
  return (
    <View>
      {currentLocation && (
        <View>
          <Text>
            {currentLocation?.coords.latitude},{' '}
            {currentLocation?.coords.longitude}
          </Text>
        </View>
      )}
      {trip &&
        trip.trip &&
        trip.trip.legs[0].maneuvers.map((maneuver) => (
          <Trip
            key={maneuver.begin_shape_index + maneuver.end_shape_index}
            maneuver={maneuver}
            factor={calibration.factor}
          />
        ))}
    </View>
  );
}
