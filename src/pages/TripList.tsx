import React from 'react';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';
import { router } from 'expo-router';
import useUserStore from '../store/useUserStore';
import Button from '../components/atoms/Button';
import ListItem from '../components/atoms/ListItem';
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
          trip.trip.legs[0].maneuvers.map((maneuver, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <ListItem key={index}>
              {index + 1}. {valueOutput(maneuver, factor)}
            </ListItem>
          ))}
      </ScrollView>
      <View className="mx-5">
        <Button onPress={() => router.back()} buttonType="secondary">
          <Text>Beenden</Text>
        </Button>
      </View>
    </SafeAreaView>
  );
}

export default TripList;
