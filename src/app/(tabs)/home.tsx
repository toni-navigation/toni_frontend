import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import MapView, { Polygon } from 'react-native-maps';

import { Button } from '@/components/atoms/Button';
import { IconButton } from '@/components/atoms/IconButton';
import { GeocoderAutocomplete } from '@/components/organisms/GeocoderAutocomplete';
import { getBbox } from '@/functions/getBbox';
import { useReverseData } from '@/mutations/useReverseData';
import { useCurrentLocationStore } from '@/store/useCurrentLocationStore';
import { useTripStore } from '@/store/useTripStore';

export default function Home() {
  // const markerRef = React.useRef(null);
  const polygonRef = React.useRef(null);
  const { changeOrigin, changeDestination, switchOriginDestination } =
    useTripStore((state) => state.actions);
  const origin = useTripStore((state) => state.origin);
  const destination = useTripStore((state) => state.destination);

  const currentLocation = useCurrentLocationStore(
    (state) => state.currentLocation
  );

  const colorscheme = useColorScheme();

  const reverseData = useReverseData();
  useEffect(() => {
    (async () => {
      if (!currentLocation) {
        return;
      }
      const startPosition = {
        lat: currentLocation.coords.latitude,
        lon: currentLocation.coords.longitude,
        radius: 0.05,
      };
      const data = await reverseData.mutateAsync(startPosition);
      changeOrigin(data.features[0]);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (reverseData.error) {
    return (
      <View>
        <Text>reverseData Error, {reverseData.error.message}</Text>
      </View>
    );
  }
  const startNavigationHandler = async () => {
    // let newOrigin;
    // if (origin === null) {
    //   newOrigin = currentLocation
    //     ? [currentLocation.coords.longitude, currentLocation.coords.latitude]
    //     : undefined;
    // }
    if (origin && destination) {
      const params = {
        origin: origin.geometry.coordinates,
        destination: destination.geometry.coordinates,
      };

      router.push({ pathname: `/trip`, params });
    }
  };

  if (reverseData.error) {
    return (
      <View>
        <Text>reverseData Error</Text>
      </View>
    );
  }

  const bbox = currentLocation && getBbox(currentLocation);
  const bboxCoordinates = bbox && [
    { latitude: bbox[1], longitude: bbox[0] }, // southwest corner
    { latitude: bbox[1], longitude: bbox[2] }, // northwest corner
    { latitude: bbox[3], longitude: bbox[2] }, // northeast corner
    { latitude: bbox[3], longitude: bbox[0] }, // southeast corner
    { latitude: bbox[1], longitude: bbox[0] }, // closing the polygon - southwest corner
  ];

  return (
    <SafeAreaView
      className={`flex-1 ${colorscheme === 'light' ? 'bg-background-light' : 'bg-background-dark'}`}
    >
      <ScrollView className="mx-5 my-5" keyboardShouldPersistTaps="always">
        <GeocoderAutocomplete
          value={origin}
          placeholder="Startpunkt eingeben"
          label="Startpunkt"
          onChange={(value) => changeOrigin(value)}
        />

        <IconButton
          onPress={switchOriginDestination}
          buttonType={!origin || !destination ? 'disabled' : 'primary'}
        >
          <Ionicons name="swap-vertical" size={32} color="white" />
        </IconButton>
        <GeocoderAutocomplete
          value={destination}
          placeholder="Zielpunkt eingeben"
          label="Zielpunkt"
          onChange={(value) => changeDestination(value)}
        />
        <MapView
          className="h-36 w-full"
          region={{
            latitude: 47.811195,
            longitude: 13.033229,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          key={0}
          scrollEnabled
          showsUserLocation
          followsUserLocation
        >
          {/* {position && <Marker ref={markerRef} coordinate={position} key={0} />} */}
          {bboxCoordinates && (
            <Polygon ref={polygonRef} key={1} coordinates={bboxCoordinates} />
          )}
        </MapView>
        <Button
          onPress={startNavigationHandler}
          buttonType={
            origin === undefined || destination === undefined
              ? 'disabled'
              : 'accent'
          }
        >
          Route starten
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
}
