import { NearestPointOnLine } from '@turf/nearest-point-on-line';

import { getDistanceInMeter } from '@/functions/getDistanceInMeter';
import { DecodedShapeProps } from '@/types/Types';
import { ValhallaProps } from '@/types/Valhalla-Types';

export const getShortestDistanceFromPoLToManeuver = (
  data: ValhallaProps,
  decodedShape: DecodedShapeProps,
  nearestPoint: NearestPointOnLine
) => {
  const distances = data.trip.legs[0].maneuvers.map((maneuver, index) => {
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

  return distances[0];
};
