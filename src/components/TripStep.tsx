import { lineString, point } from '@turf/helpers';
import nearestPointOnLine from '@turf/nearest-point-on-line';
import { router } from 'expo-router';
import React from 'react';
import { SafeAreaView, ScrollView, Text } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';

import { Button } from '@/components/atoms/Button';
import { ListItem } from '@/components/atoms/ListItem';
import { decodePolyline } from '@/functions/decodePolyline';
import { getCalibrationValue } from '@/functions/getCalibrationValue';
import { getDistanceInMeter } from '@/functions/getDistanceInMeter';
import { tripInstructionOutput } from '@/functions/tripInstructionOutput';
import { useCalibrationStore } from '@/store/useCalibrationStore';
import { useCurrentLocationStore } from '@/store/useCurrentLocationStore';
import { TripProps } from '@/types/Valhalla-Types';

interface TripStepProps {
  children: React.ReactNode;
}
export function TripStep({ children }: TripStepProps) {
  return (
    <SafeAreaView className="flex-1">
      <ScrollView className="mx-5 my-5">
        {children}

        <Button onPress={() => router.replace('/home')} buttonType="secondary">
          <Text>Beenden</Text>
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
}
