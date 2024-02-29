import React from 'react';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';
import { ValhallaManeuverProps } from '../../types/Valhalla-Types';
import useUserStore from '../../store/useUserStore';
import decodePolyline from '../functions/decodePolyline';
import Button from '../components/atoms/Button';
import ListItem from '../components/atoms/ListItem';
import { router } from 'expo-router';
import { getCalibrationValue, valueOutput } from '../functions/functions';

function TripList() {
  const { trip, calibration, currentLocation } = useUserStore();
  const factor = getCalibrationValue(calibration.factors);

  return (
    <SafeAreaView className="flex-1">
      <ScrollView className="mx-5 my-5">
        {trip &&
          currentLocation &&
          trip.trip &&
          trip.trip.legs[0].maneuvers.map((maneuver) => (
            <ListItem
              touchable={false}
              key={maneuver.begin_shape_index + maneuver.end_shape_index}
              value={valueOutput(maneuver, factor)}
            />
          ))}
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

export default TripList;
