import { NearestPointOnLine } from '@turf/nearest-point-on-line';

import { TripProps } from '@/types/Valhalla-Types';

export const getMatchingManeuverIndex = (
  trip: TripProps,
  nearestPoint: NearestPointOnLine
) => {
  const { maneuvers } = trip.legs[0];
  const shapeIndex = nearestPoint.properties.index;
  const currentManeuver =
    shapeIndex !== undefined &&
    maneuvers.findIndex(
      (maneuver) =>
        maneuver.begin_shape_index && maneuver.begin_shape_index > shapeIndex
    );

  console.log(shapeIndex, maneuvers[0].begin_shape_index, currentManeuver);

  return typeof currentManeuver === 'number' ? currentManeuver : undefined;

  // return {
  //   previousManeuver:
  //     typeof currentManeuver === 'number'
  //       ? maneuvers[currentManeuver - 1]
  //       : undefined,
  //   currentManeuver:
  //     typeof currentManeuver === 'number'
  //       ? maneuvers[currentManeuver]
  //       : undefined,
  //   maneuverIndex: currentManeuver,
  // };
};
