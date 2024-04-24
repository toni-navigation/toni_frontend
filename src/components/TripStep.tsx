import { lineString, point } from '@turf/helpers';
import nearestPointOnLine from '@turf/nearest-point-on-line';
import React from 'react';
import { SafeAreaView, ScrollView, Text } from 'react-native';

import { Card } from '@/components/organisms/Card';
import { decodePolyline } from '@/functions/decodePolyline';
import { getCalibrationValue } from '@/functions/getCalibrationValue';
import { getDistanceInMeter } from '@/functions/getDistanceInMeter';
import { matchIconType } from '@/functions/matchIconType';
import { tripInstructionOutput } from '@/functions/tripInstructionOutput';
import { useCalibrationStore } from '@/store/useCalibrationStore';
import { useCurrentLocationStore } from '@/store/useCurrentLocationStore';
import { TripProps } from '@/types/Valhalla-Types';

const THRESHOLD_MAXDISTANCE_FALLBACK_IN_METERS = 20;

export function TripStep({ data }: { data: TripProps }) {
  const currentLocation = useCurrentLocationStore(
    (state) => state.currentLocation
  );
  const calibration = useCalibrationStore((state) => state.calibration);

  const decodedShape: {
    result: number;
    lng: number;
    byte: null | number;
    shift: number;
    coordinates: [number, number][];
    index: number;
    factor: number;
    lat: number;
  } = decodePolyline(data.legs[0].shape);

  if (!currentLocation || !data) {
    return (
      <SafeAreaView>
        <ScrollView>
          <Text>Loading...</Text>
        </ScrollView>
      </SafeAreaView>
    );
  }
  const currentLocationPoint = point([
    currentLocation.coords.latitude,
    currentLocation.coords.longitude,
  ]);

  const line = lineString(decodedShape.coordinates);

  const nearestPoint = nearestPointOnLine(line, currentLocationPoint);
  const factor = getCalibrationValue(calibration.factors);

  const distances = data.legs[0].maneuvers.map((maneuver, index) => {
    const startLat = decodedShape.coordinates[maneuver.begin_shape_index][0];
    const startLon = decodedShape.coordinates[maneuver.begin_shape_index][1];

  return (
    <SafeAreaView className="flex-1 m-5">
      <Card
        iconKey={matchIconType(
          data.legs[0].maneuvers[shortestDistance.maneuverIndex].type
        )}
      >
        {instruction}
      </Card>
    </SafeAreaView>
  );
}
