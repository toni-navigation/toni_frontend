import { NearestPointOnLine } from '@turf/nearest-point-on-line';
import React from 'react';
import MapView, { Marker, Polyline } from 'react-native-maps';

import { CurrentLocationType, DecodedShapeProps } from '@/types/Types';
import { ValhallaProps } from '@/types/Valhalla-Types';

interface MapProps {
  currentLocation: CurrentLocationType;
  nearestPoint: NearestPointOnLine | null | undefined;
  data: ValhallaProps | null | undefined;
  decodedShape: DecodedShapeProps;
}
export function Map({
  currentLocation,
  nearestPoint,
  data,
  decodedShape,
}: MapProps) {
  return (
    <MapView
      style={{ height: 400 }}
      initialRegion={{
        latitude: currentLocation?.coords.latitude || 0,
        longitude: currentLocation?.coords.longitude || 0,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
    >
      {nearestPoint && (
        <Marker
          coordinate={{
            latitude: nearestPoint.geometry.coordinates[0],
            longitude: nearestPoint.geometry.coordinates[1],
          }}
          title="Nearest Point"
          description="You are here"
        />
      )}
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
      {data?.trip.legs[0] &&
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
  );
}
