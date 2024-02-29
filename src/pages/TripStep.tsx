import React from 'react';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';
import { ValhallaManeuverProps } from '../../types/Valhalla-Types';
import useUserStore from '../../store/useUserStore';
import decodePolyline from '../functions/decodePolyline';
import {
  distanceOfLatLon,
  getCalibrationValue,
  valueOutput,
} from '../functions/functions';
import Button from '../components/atoms/Button';
import ListItem from '../components/atoms/ListItem';
import { router } from 'expo-router';

function TripStep() {
  const { trip, calibration, currentLocation } = useUserStore();

  const [currentManeuver, setCurrentManeuver] = React.useState(0);
  const factor = getCalibrationValue(calibration.factors);

  let decodedShape: {
    result: number;
    lng: number;
    byte: null | number;
    shift: number;
    coordinates: [number, number][];
    index: number;
    factor: number;
    lat: number;
  };
  if (trip && currentLocation) {
    decodedShape = decodePolyline(trip?.trip.legs[0].shape);
    // console.log(decodedShape);
    const startLat =
      decodedShape.coordinates[
        trip.trip.legs[0].maneuvers[currentManeuver + 1].begin_shape_index
      ][0];
    const startLon =
      decodedShape.coordinates[
        trip.trip.legs[0].maneuvers[currentManeuver + 1].begin_shape_index
      ][1];

    const currentLat = currentLocation.coords.latitude;
    const currentLon = currentLocation.coords.longitude;

    const distanceChange =
      distanceOfLatLon(startLat, startLon, currentLat, currentLon, 'K') * 1000;

    if (distanceChange < 5) {
      setCurrentManeuver((prevState) => prevState + 1);
    }
  }

  let maneuverValue = '';

  if (trip) {
    const maneuver = trip.trip.legs[0].maneuvers[currentManeuver];
    maneuverValue = valueOutput(maneuver, factor);
  }

  return (
    <SafeAreaView className="flex-1">
      <ScrollView className="mx-5 my-5">
        {maneuverValue.length > 0 && trip && currentLocation && trip.trip && (
          <ListItem
            touchable={false}
            key={
              trip.trip.legs[0].maneuvers[currentManeuver].begin_shape_index +
              trip.trip.legs[0].maneuvers[currentManeuver].end_shape_index
            }
            value={maneuverValue}
          />
        )}
        <Button
          disabled={false}
          onPress={() => router.back()}
          buttonType="secondary"
        >
          <Text>Beenden</Text>
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
}

export default TripStep;
