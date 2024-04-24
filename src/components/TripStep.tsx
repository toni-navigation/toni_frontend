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

    const distance = getDistanceInMeter(
      {
        coords: {
          latitude: startLat,
          longitude: startLon,
        },
      },
      {
        coords: {
          latitude: nearestPoint.geometry.coordinates[0],
          longitude: nearestPoint.geometry.coordinates[1],
        },
      }
    );

    return {
      maneuverIndex: index,
      distance,
    };
  });

  // TODO Fallback if distance === null (not: a.distance ?? 0)
  distances.sort((a, b) => (a.distance ?? 0) - (b.distance ?? 0));

  const shortestDistance = distances[0];

  let instruction = tripInstructionOutput(
    data.legs[0].maneuvers[shortestDistance.maneuverIndex],
    factor
  );
  if (
    nearestPoint.properties.dist &&
    nearestPoint.properties.dist * 1000 >
      THRESHOLD_MAXDISTANCE_FALLBACK_IN_METERS
  ) {
    instruction = 'Bitte gehe wieder auf die Route.';
  }

  return (
    <SafeAreaView className="flex-1">
      <ScrollView className="mx-5 my-5">
        <MapView
          style={{ height: 400 }}
          initialRegion={{
            latitude: currentLocation?.coords.latitude || 0,
            longitude: currentLocation?.coords.longitude || 0,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker
            coordinate={{
              latitude: nearestPoint.geometry.coordinates[0],
              longitude: nearestPoint.geometry.coordinates[1],
            }}
            title="Nearest Point"
            description="You are here"
          />
          {currentLocation && (
            <Marker
              coordinate={{
                latitude: currentLocation.coords.latitude,
                longitude: currentLocation.coords.longitude,
              }}
              title="Current Location"
              description="You are here"
            />
          )}
          {data.legs[0] &&
            decodedShape?.coordinates.map((coord, index) => {
              if (index === 0) {
                return null;
              }

              return (
                <Polyline
                  key={coord.toString()}
                  coordinates={[
                    {
                      latitude: decodedShape.coordinates[index - 1][0],
                      longitude: decodedShape.coordinates[index - 1][1],
                    },
                    {
                      latitude: coord[0],
                      longitude: coord[1],
                    },
                  ]}
                />
              );
            })}
        </MapView>
        <ListItem
          key={
            data.legs[0].maneuvers[shortestDistance.maneuverIndex]
              .begin_shape_index +
            data.legs[0].maneuvers[shortestDistance.maneuverIndex]
              .end_shape_index
          }
        >
          {instruction}
        </ListItem>
        <Button
          onPress={() => router.replace('/home')}
          disabled={false}
          buttonType="primary"
        >
          <Text>Beenden</Text>
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
}
