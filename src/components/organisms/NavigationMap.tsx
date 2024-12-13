import { NearestPointOnLine } from '@turf/nearest-point-on-line';
import React, { useContext } from 'react';
import MapView, { Marker, Polygon, Polyline } from 'react-native-maps';

import { themes } from '@/colors';
import { ThemeContext } from '@/components/ThemeProvider';
import { ToniCurrentLocation } from '@/components/atoms/icons/ToniCurrentLocation';
import { ToniLocation } from '@/components/atoms/icons/ToniLocation';
import { DecodedShapeProps } from '@/types/Types';

interface NavigationMapMapProps {
  origin?: [number, number];
  destination?: [number, number];
  snapshot?: NearestPointOnLine | null | undefined;
  decodedShape?: DecodedShapeProps | null;
  bbox?: { latitude: number; longitude: number }[] | null | undefined;
  height?: number;
}

export function NavigationMap({
  origin,
  snapshot,
  destination,
  decodedShape,
  bbox,
  height,
}: NavigationMapMapProps) {
  const { theme } = useContext(ThemeContext);
  const calculateMidpoint = (point1, point2) => ({
    latitude: (point1[0] + point2[0]) / 2,
    longitude: (point1[1] + point2[1]) / 2,
  });

  const calculateDelta = (point1, point2) => ({
    latitudeDelta: Math.abs(point1[0] - point2[0]) * 1.5,
    longitudeDelta: Math.abs(point1[1] - point2[1]) * 1.5,
  });

  const midpoint =
    origin && destination
      ? calculateMidpoint(origin, destination)
      : { latitude: 0, longitude: 0 };
  const delta =
    origin && destination
      ? calculateDelta(origin, destination)
      : { latitudeDelta: 0.022, longitudeDelta: 0.221 };

  return (
    <MapView
      style={{ height }}
      initialRegion={{
        latitude: midpoint.latitude,
        longitude: midpoint.longitude,
        latitudeDelta: delta.latitudeDelta,
        longitudeDelta: delta.longitudeDelta,
      }}
      showsUserLocation
      rotateEnabled
      showsCompass
      followsUserLocation
    >
      {snapshot && origin && (
        <Marker
          coordinate={{
            latitude: snapshot.geometry.coordinates[0],
            longitude: snapshot.geometry.coordinates[1],
          }}
          title="Nearest Point"
          description="You are here"
        >
          <ToniCurrentLocation
            width={40}
            height={40}
            fill={themes.external[`--${theme}-mode-icon-button`]}
            stroke={themes.external[`--${theme}-mode-icon-button`]}
            strokeWidth={3}
          />
        </Marker>
      )}
      {destination && (
        <Marker
          coordinate={{
            latitude: destination[0],
            longitude: destination[1],
          }}
          title="Current Location"
          description="You are here"
        >
          <ToniLocation
            width={40}
            height={40}
            stroke={themes.external[`--accent`]}
            fillInner={themes.external[`--accent`]}
            strokeWidth={3}
          />
        </Marker>
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
            strokeColor={themes.external[`--${theme}-mode-primary`]}
            strokeWidth={6}
            zIndex={98}
          />
        );
      })}
    </MapView>
  );
}
