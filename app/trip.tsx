import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import Trip from '../src/pages/Trip';
import useUserStore from '../store/useUserStore';

export default function TripPage() {
  const { trip, calibration, currentLocation } = useUserStore();
  const colorscheme = useColorScheme();

  return (
    <SafeAreaView
      className={`flex-1 ${colorscheme === 'light' ? 'bg-background-light' : 'bg-background-dark'}`}
    >
      <ScrollView className="mx-5 my-5">
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
      </ScrollView>
    </SafeAreaView>
  );
}
