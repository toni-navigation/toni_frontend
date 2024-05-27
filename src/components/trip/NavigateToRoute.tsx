import bearing from '@turf/bearing';
import { point } from '@turf/helpers';
import { NearestPointOnLine } from '@turf/nearest-point-on-line';
import { Subscription } from 'expo-modules-core';
import { Magnetometer } from 'expo-sensors';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, Vibration } from 'react-native';

import { AlertBar } from '@/components/organisms/AlertBar';
import { Card } from '@/components/organisms/Card';
import { calculateOrientation } from '@/functions/calculateOrientation';
import { directionToMove } from '@/functions/directionToMove';
import { CurrentLocationProps } from '@/types/Types';

export const ACCURACY_THRESHOLD = 10;
interface RouteToStartProps {
  distanceToStart: number;
  currentLocation: CurrentLocationProps;
  nearestPoint: NearestPointOnLine;
  children: React.ReactNode;
}

export function NavigateToRoute({
  distanceToStart,
  currentLocation,
  nearestPoint,
  children,
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
    subscribe();

    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (direction) {
      Vibration.vibrate(300);
    }

    return () => {
      Vibration.cancel();
    };
  }, [direction]);

  return (
    <SafeAreaView className="flex-1 bg-background-light">
      {currentLocation.coords.accuracy &&
        currentLocation.coords.accuracy > ACCURACY_THRESHOLD && (
          <AlertBar
            text={`Dein GPS Signal ist auf ${currentLocation?.coords?.accuracy?.toFixed(2) ?? 0} Meter ungenau.`}
          />
        )}
      <Card iconKey={direction ? 'arrowStraight' : 'cross'}>
        Die Route ist {distanceToStart.toFixed(2)} Meter entfernt.
        {direction
          ? '\nDie Route befindet sich in dieser Richtung.'
          : '\nRichte das Handy nach vorne und drehe dich, um die Route zu finden'}
      </Card>
      {children}
    </SafeAreaView>
  );
}
