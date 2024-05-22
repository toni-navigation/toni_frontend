import { router } from 'expo-router';
import React, { useEffect } from 'react';
import { SafeAreaView, ScrollView, useColorScheme, View } from 'react-native';

import { Button } from '@/components/atoms/Button';
import { Header } from '@/components/atoms/Header';
import { IconButton } from '@/components/atoms/IconButton';
import { GeocoderAutocomplete } from '@/components/organisms/GeocoderAutocomplete';
import { useCurrentLocationStore } from '@/store/useCurrentLocationStore';
import { OriginDestinationType, useTripStore } from '@/store/useTripStore';

export default function HomePage() {
  const { changeOrigin, changeDestination, switchOriginDestination } =
    useTripStore((state) => state.actions);
  const origin = useTripStore((state) => state.origin);
  const destination = useTripStore((state) => state.destination);
  const currentLocation = useCurrentLocationStore(
    (state) => state.currentLocation
  );

  // useEffect(() => {
  //   subscribe();
  //
  //   return () => unsubscribe();
  // }, []);
  // const calculateDirection = () => {
  //   if (!currentLocation) return;
  //
  //   const { latitude, longitude } = currentLocation.coords;
  //   const deltaLongitude = targetLocation.longitude - longitude;
  //   const y = Math.sin(deltaLongitude) * Math.cos(targetLocation.latitude);
  //   const x =
  //     Math.cos(latitude) * Math.sin(targetLocation.latitude) -
  //     Math.sin(latitude) *
  //       Math.cos(targetLocation.latitude) *
  //       Math.cos(deltaLongitude);
  //   const theta = Math.atan2(y, x);
  //   const bearing = (theta * 180) / Math.PI;
  //   const direction = (bearing + 360) % 360;
  //   // console.log(gyroscopeData.x);
  //   // if (Math.abs(gyroscopeData.x - direction) <= 0.5) {
  //     // Vibrate for 500ms
  //     // Vibration.vibrate(500);
  //   }
  //
  //   return direction;
  // };

  // const direction = calculateDirection();

  useEffect(
    () =>
      // const gyroscopeSubscription = Gyroscope.addListener((data) => {
      //   setGyroscopeData(data);
      // });
      //
      () => {
        // gyroscopeSubscription && gyroscopeSubscription.remove();
      },
    []
  );

  const colorscheme = useColorScheme();

  const getCoordinates = (location: OriginDestinationType) => {
    if (location) {
      return location.geometry.coordinates;
    }
    if (location === null && currentLocation) {
      return [
        currentLocation.coords.longitude,
        currentLocation.coords.latitude,
      ];
    }

    return undefined;
  };
  const navigateToTrip = (params: {
    origin: number[];
    destination: number[];
  }) => {
    // Assuming router.push handles navigation to the trip page
    router.push({ pathname: `/home/trip`, params });
  };
  const startNavigationHandler = async () => {
    const newOrigin = getCoordinates(origin);
    const newDestination = getCoordinates(destination);

    if (newOrigin && newDestination) {
      const params = {
        origin: newOrigin,
        destination: newDestination,
      };

      navigateToTrip(params);
    }
  };
  // const bbox = currentLocation && getBbox(currentLocation);
  // const bboxCoordinates = bbox && [
  //   { latitude: bbox[1], longitude: bbox[0] }, // southwest corner
  //   { latitude: bbox[1], longitude: bbox[2] }, // northwest corner
  //   { latitude: bbox[3], longitude: bbox[2] }, // northeast corner
  //   { latitude: bbox[3], longitude: bbox[0] }, // southeast corner
  //   { latitude: bbox[1], longitude: bbox[0] }, // closing the polygon - southwest corner
  // ];

  // if (!skipped && calibration.factors.length === 0) {
  //   return <Calibration isFromIntro />;
  // }

  return (
    <SafeAreaView
      className={`flex-1 ${colorscheme === 'light' ? 'bg-background-light' : 'bg-background-dark'}`}
    >
      {/* <Text>Current Location: {JSON.stringify(currentLocation)}</Text> */}
      {/* <Text>Gyroscope Data: {JSON.stringify(gyroscopeData)}</Text> */}
      {/* <Text>Direction to Target: {direction}</Text> */}

      <ScrollView className="px-8 my-8" keyboardShouldPersistTaps="always">
        <Header>Hallo</Header>
        <GeocoderAutocomplete
          value={origin}
          placeholder="Start eingeben"
          label="Start"
          onChange={(value) => changeOrigin(value)}
        />
        <View className="pt-8" />
        <IconButton
          onPress={switchOriginDestination}
          buttonType="primary"
          disabled={origin === undefined && destination === undefined}
          icon="switchArrow"
          classes="m-0"
        />
        <GeocoderAutocomplete
          value={destination}
          placeholder="Ziel eingeben"
          label="Ziel"
          onChange={(value) => changeDestination(value)}
        />
      </ScrollView>
      <View className="mx-5 mb-8">
        <Button
          onPress={startNavigationHandler}
          disabled={origin === undefined || !destination}
          buttonType="accent"
        >
          Route starten
        </Button>
      </View>
    </SafeAreaView>
  );
}
