import { router } from 'expo-router';
import { Gyroscope, Magnetometer } from 'expo-sensors';
import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import { Button } from '@/components/atoms/Button';
import { Header } from '@/components/atoms/Header';
import { IconButton } from '@/components/atoms/IconButton';
import { GeocoderAutocomplete } from '@/components/organisms/GeocoderAutocomplete';
import { getBbox } from '@/functions/getBbox';
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
  const [{ x, y, z }, setData] = useState({
    x: 0,
    y: 0,
    z: 0,
  });
  const [subscription, setSubscription] = useState<any>(null);
  const [magnetometerSubscription, setMagnetometerSubscription] =
    useState<any>(null);

  const slow = () => Gyroscope.setUpdateInterval(1000);
  const fast = () => Gyroscope.setUpdateInterval(16);

  const subscribe = () => {
    Gyroscope.addListener((gyroscopeData) => {
      // console.log(gyroscopeData);
      // setData(gyroscopeData);
    });
  };

  const unsubscribe = () => {
    if (subscription) {
      subscription.remove();
    }
    setSubscription(null);
  };

  const magnetometerSubscribe = () => {
    Magnetometer.addListener((result) => {
      // console.log(result);
      setData(result);
    });
  };

  const magnetometerUnsubscribe = () => {
    if (magnetometerSubscription) {
      magnetometerSubscription.remove();
    }
    setMagnetometerSubscription(null);
  };

  useEffect(() => {
    // subscribe();
    magnetometerSubscribe();

    return () => {
      magnetometerUnsubscribe();
      // unsubscribe();
    };
  }, []);
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

  const bbox = currentLocation && getBbox(currentLocation);
  const bboxCoordinates = bbox && [
    { latitude: bbox[1], longitude: bbox[0] }, // southwest corner
    { latitude: bbox[1], longitude: bbox[2] }, // northwest corner
    { latitude: bbox[3], longitude: bbox[2] }, // northeast corner
    { latitude: bbox[3], longitude: bbox[0] }, // southeast corner
    { latitude: bbox[1], longitude: bbox[0] }, // closing the polygon - southwest corner
  ];

  // if (!skipped && calibration.factors.length === 0) {
  //   return <Calibration isFromIntro />;
  // }

  return (
    <SafeAreaView
      className={`flex-1 ${colorscheme === 'light' ? 'bg-background-light' : 'bg-background-dark'}`}
    >
      <View>
        <Text>Gyroscope:</Text>
        <Text>x: {x}</Text>
        <Text>y: {y}</Text>
        <Text>z: {z}</Text>
        <View>
          <Button
            buttonType="primary"
            disabled={false}
            onPress={subscription ? unsubscribe : subscribe}
          >
            {subscription ? 'Off' : 'On'}
          </Button>
          <Button buttonType="primary" disabled={false} onPress={slow}>
            <Text>Slow</Text>
          </Button>
          <Button buttonType="primary" disabled={false} onPress={fast}>
            <Text>Fast</Text>
          </Button>
        </View>
      </View>
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

        {/* <Map */}
        {/*  bbox={bboxCoordinates} */}
        {/*  origin={ */}
        {/*    origin */}
        {/*      ? { */}
        {/*          lat: origin.geometry.coordinates[1], */}
        {/*          lon: origin.geometry.coordinates[0], */}
        {/*        } */}
        {/*      : undefined */}
        {/*  } */}
        {/*  destination={ */}
        {/*    destination */}
        {/*      ? { */}
        {/*          lat: destination.geometry.coordinates[0], */}
        {/*          lon: destination.geometry.coordinates[1], */}
        {/*        } */}
        {/*      : undefined */}
        {/*  } */}
        {/*  currentLocation={currentLocation} */}
        {/* /> */}
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
