import { NearestPointOnLine } from '@turf/nearest-point-on-line';

import { ValhallaProps } from '@/types/Valhalla-Types';

export const getMatchingManeuverIndex = (
  data: ValhallaProps,
  nearestPoint: NearestPointOnLine
) => {
  const { maneuvers } = data.trip.legs[0];
  const shapeIndex = nearestPoint.properties.index;
  const currentManeuver =
    shapeIndex !== undefined &&
    maneuvers.findIndex(
      (maneuver) =>
        maneuver.begin_shape_index && maneuver.begin_shape_index > shapeIndex
    );

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
