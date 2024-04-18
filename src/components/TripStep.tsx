import { router } from 'expo-router';
import * as Speech from 'expo-speech';
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

export function TripStep({ data }: { data: TripProps }) {
  const currentLocation = useCurrentLocationStore(
    (state) => state.currentLocation
  );
  const calibration = useCalibrationStore((state) => state.calibration);

  const [currentManeuver, setCurrentManeuver] = React.useState(0);
  const factor = getCalibrationValue(calibration.factors);
  // let maneuverValue = '';

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
  if (currentLocation && data) {
    const startLat =
      decodedShape.coordinates[
        data.legs[0].maneuvers[currentManeuver + 1].begin_shape_index
      ][0];
    const startLon =
      decodedShape.coordinates[
        data.legs[0].maneuvers[currentManeuver + 1].begin_shape_index
      ][1];

    const distanceChange = getDistanceInMeter(
      {
        coords: {
          latitude: startLat,
          longitude: startLon,
        },
      },
      currentLocation
    );
    if (distanceChange && distanceChange < 5) {
      setCurrentManeuver((prevState) => prevState + 1);
      Speech.speak(
        tripInstructionOutput(data.legs[0].maneuvers[currentManeuver], factor),
        {
          language: 'de',
        }
      );
    }
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
            data.legs[0].maneuvers[currentManeuver].begin_shape_index +
            data.legs[0].maneuvers[currentManeuver].end_shape_index
          }
        >
          {tripInstructionOutput(
            data.legs[0].maneuvers[currentManeuver],
            factor
          )}
        </ListItem>
        <Button onPress={() => router.back()} buttonType="secondary">
          <Text>Beenden</Text>
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
}
