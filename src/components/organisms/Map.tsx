import { NearestPointOnLine } from '@turf/nearest-point-on-line';
import { Feature, GeoJsonProperties, LineString } from 'geojson';
import React from 'react';
import MapView, { Circle, Marker, Polygon, Polyline } from 'react-native-maps';

import { DecodedShapeProps } from '@/types/Types';
import { ValhallaManeuverProps } from '@/types/Valhalla-Types';

interface MapProps {
  origin?: [number, number];
  destination?: [number, number];
  snapshot?: NearestPointOnLine | null | undefined;
  decodedShape?: DecodedShapeProps | null;
  bbox?: { latitude: number; longitude: number }[] | null | undefined;
  maneuvers?: ValhallaManeuverProps[];
  currentManeuverIndex?: number;
  sliced?: false | Feature<LineString, GeoJsonProperties> | undefined;
}
export function Map({
  origin,
  snapshot,
  destination,
  decodedShape,
  bbox,
  maneuvers,
  currentManeuverIndex,
  sliced,
}: MapProps) {
  return (
    <MapView
      style={{ height: 300 }}
      initialRegion={{
        latitude: origin ? origin[0] : 0,
        longitude: origin ? origin[1] : 0,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
      showsUserLocation
      rotateEnabled
      showsCompass
      followsUserLocation
    >
      {snapshot && (
        <Marker
          coordinate={{
            latitude: snapshot.geometry.coordinates[0],
            longitude: snapshot.geometry.coordinates[1],
          }}
          title="Nearest Point"
          description="You are here"
        />
      )}
      {sliced && (
        <Polyline
          coordinates={sliced.geometry.coordinates.map((coord) => ({
            latitude: coord[0],
            longitude: coord[1],
          }))}
          strokeColor="red"
          strokeWidth={2}
        />
      )}
      {origin && (
        <Marker
          coordinate={{
            latitude: origin[0],
            longitude: origin[1],
          }}
          title="Current Location"
          description="You are here"
        />
      )}
      {destination && (
        <Marker
          coordinate={{
            latitude: destination[0],
            longitude: destination[1],
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
            zIndex={98}
          />
        );
      })}

      {decodedShape?.coordinates.map((coord, index) => (
        <Circle
          radius={2}
          /* eslint-disable-next-line react/no-array-index-key */
          key={index}
          center={{
            latitude: coord[0],
            longitude: coord[1],
          }}
          fillColor={
            maneuvers?.find((maneuver) => maneuver.begin_shape_index === index)
              ? 'red'
              : 'blue'
          }
          zIndex={99}
        />
      ))}
      {currentManeuverIndex !== undefined &&
      decodedShape &&
      maneuvers &&
      decodedShape.coordinates[
        maneuvers[currentManeuverIndex].begin_shape_index || 0
      ] ? (
        <Circle
          center={{
            latitude:
              decodedShape.coordinates[
                maneuvers[currentManeuverIndex].begin_shape_index || 0
              ][0],
            longitude:
              decodedShape.coordinates[
                maneuvers[currentManeuverIndex].begin_shape_index || 0
              ][1],
          }}
          radius={2}
          fillColor="green"
          zIndex={100}
        />
      ) : null}
    </MapView>
  );
}
