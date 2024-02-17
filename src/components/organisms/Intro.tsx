import React from 'react';
import { Text, View } from 'react-native';
import MapView, { LatLng, Marker } from 'react-native-maps';
import { CurrentLocationType } from '../../../types/Types';

function Intro({ currentLocation }: { currentLocation: CurrentLocationType }) {
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
    </View>
  );
}

export default Intro;
