import bearing from '@turf/bearing';
import { point } from '@turf/helpers';
import { NearestPointOnLine } from '@turf/nearest-point-on-line';
import { Subscription } from 'expo-modules-core';
import { Magnetometer } from 'expo-sensors';
import * as Speech from 'expo-speech';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, Vibration, View } from 'react-native';

import { Map } from '@/components/organisms/Map';
import { calculateOrientation } from '@/functions/calculateOrientation';
import { directionToMove } from '@/functions/directionToMove';
import { CurrentLocationProps } from '@/types/Types';

interface RouteToStartProps {
  distanceToStart: number;
  currentLocation: CurrentLocationProps;
  nearestPoint: NearestPointOnLine;
  isStart: boolean;
}

export function NavigateToRoute({
  distanceToStart,
  currentLocation,
  nearestPoint,
  isStart,
}: RouteToStartProps) {
  const [{ x, y }, setData] = useState({
    x: 0,
    y: 0,
  });
  const [subscription, setSubscription] = useState<Subscription>();

  const subscribe = () => {
    Magnetometer.setUpdateInterval(16);
    setSubscription(
      Magnetometer.addListener((result) => {
        setData(result);
      })
    );
  };

  const unsubscribe = () => {
    if (subscription) {
      subscription.remove();
    }
    setSubscription(undefined);
  };

  const point1 = point([
    currentLocation.coords.latitude,
    currentLocation.coords.longitude,
  ]);

  const orientation = calculateOrientation(x, y);
  const direction = directionToMove(bearing(point1, nearestPoint), orientation);

  useEffect(() => {
    if (direction) {
      Vibration.vibrate(300);
    }
  }, [direction]);

  useEffect(() => {
    subscribe();
    Speech.speak(
      'Du befindest dich nicht auf der Route. Richte das Handy nach vorne und drehe dich, um die Route zu finden. Sobald dein Handy vibriert, schaust du in die richtige Richtung',
      {
        language: 'de',
      }
    );

    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-background-light">
      <View>
        <Text>Dein GPS Signal beträgt: {currentLocation.coords.accuracy}</Text>
        {subscription && (
          <View>
            <Text>Die Route ist {distanceToStart} Meter entfernt.</Text>
            <Text>
              {direction
                ? 'Die Route befindet sich in dieser Richtung.'
                : 'Richte das Handy nach vorne und drehe dich, um die Route zu finden'}
            </Text>
          </View>
        )}
      </View>
      <Map
        origin={{
          lat: currentLocation.coords.latitude,
          lon: currentLocation.coords.longitude,
        }}
        destination={{
          lat: nearestPoint.geometry.coordinates[0],
          lon: nearestPoint.geometry.coordinates[1],
        }}
      />
    </SafeAreaView>
  );
}
