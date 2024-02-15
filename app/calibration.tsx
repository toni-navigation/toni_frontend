import React from 'react';
import { View, Text } from 'react-native';
import { router } from 'expo-router';
import MapView, { LatLng, Marker } from 'react-native-maps';
import useUserStore from '../store/useUserStore';
import Calibrate from '../src/pages/Calibrate';
import Button from '../src/components/atoms/Button';

export default function CalibrationPage() {
  const { currentLocation, calibration } = useUserStore();

  let location: LatLng | undefined;
  if (
    currentLocation &&
    currentLocation.coords &&
    currentLocation.coords.latitude &&
    currentLocation.coords.longitude
  ) {
    location = {
      latitude: currentLocation.coords.latitude,
      longitude: currentLocation.coords.longitude,
    };
  }
  return (
    <View>
      <View>
        {currentLocation && <Text>{JSON.stringify(currentLocation)}</Text>}
        <Text className="text-4xl font-extrabold dark:text-white">BlndFnd</Text>
        <MapView
          className="h-36 w-full"
          region={{
            latitude: 47.811195,
            longitude: 13.033229,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          {location && <Marker coordinate={location} />}
        </MapView>
        <Calibrate />
      </View>
      <View>
        <Button
          buttonType="primary"
          onPress={() => router.push('/home')}
          disabled={!calibration.isStart}
        >
          Speichern
        </Button>
      </View>
    </View>
  );
}
