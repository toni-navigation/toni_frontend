import { NearestPointOnLine } from '@turf/nearest-point-on-line';
import React from 'react';
import MapView, { Marker, Polygon, Polyline } from 'react-native-maps';

import { CurrentLocationType, DecodedShapeProps } from '@/types/Types';

type CoordsType = { lat: number; lon: number };
interface MapProps {
  origin?: CoordsType;
  destination?: CoordsType;
  currentLocation?: CurrentLocationType;
  nearestPoint?: NearestPointOnLine | null | undefined;
  decodedShape?: DecodedShapeProps;
  bbox?: { latitude: number; longitude: number }[] | null | undefined;
}
export function Map({
  origin,
  nearestPoint,
  destination,
  currentLocation,
  decodedShape,
  bbox,
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
      showsUserLocation
      followsUserLocation
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
      {origin && (
        <Marker
          coordinate={{
            latitude: origin.lat,
            longitude: origin.lon,
          }}
          title="Current Location"
          description="You are here"
        />
      )}
      {destination && (
        <Marker
          coordinate={{
            latitude: destination.lat,
            longitude: destination.lon,
          }}
          title="Current Location"
          description="You are here"
        />
      )}
      {bbox && <Polygon key={1} coordinates={bbox} />}
      {decodedShape?.coordinates.map((coord, index) => {
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
