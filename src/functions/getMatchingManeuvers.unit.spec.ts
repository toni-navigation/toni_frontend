import { point } from '@turf/helpers';
import { NearestPointOnLine } from '@turf/nearest-point-on-line';

import { getMatchingManeuvers } from '@/functions/getMatchingManeuvers';

describe('getMatchingManeuvers', () => {
  it('returns correct maneuvers for valid data and nearest point', () => {
    const data: any = {
      trip: {
        legs: [
          {
            maneuvers: [
              { begin_shape_index: 0 },
              { begin_shape_index: 2 },
              { begin_shape_index: 4 },
            ],
          },
        ],
      },
    };
    const nearestPoint: NearestPointOnLine = {
      type: 'Feature',
      properties: { index: 1 },
      geometry: point([0, 0]).geometry,
    };
    const result = getMatchingManeuvers(data, nearestPoint);
    expect(result.previousManeuver).toEqual({ begin_shape_index: 0 });
    expect(result.currentManeuver).toEqual({ begin_shape_index: 2 });
    expect(result.maneuverIndex).toBe(1);
  });

  it('returns undefined maneuvers for nearest point with undefined index', () => {
    const data: any = {
      trip: {
        legs: [
          {
            maneuvers: [
              { begin_shape_index: 0 },
              { begin_shape_index: 2 },
              { begin_shape_index: 4 },
            ],
          },
        ],
      },
    };
    const nearestPoint: NearestPointOnLine = {
      type: 'Feature',
      properties: { index: undefined },
      geometry: point([0, 0]).geometry,
    };
    const result = getMatchingManeuvers(data, nearestPoint);
    expect(result.previousManeuver).toBeUndefined();
    expect(result.currentManeuver).toBeUndefined();
    expect(result.maneuverIndex).toBeFalsy();
  });

  it('returns undefined maneuvers for empty maneuvers array', () => {
    const data: any = {
      trip: {
        legs: [
          {
            maneuvers: [],
          },
        ],
      },
    };
    const nearestPoint: NearestPointOnLine = {
      type: 'Feature',
      properties: { index: 1 },
      geometry: point([0, 0]).geometry,
    };
    const result = getMatchingManeuvers(data, nearestPoint);
    expect(result.previousManeuver).toBeUndefined();
    expect(result.currentManeuver).toBeUndefined();
    expect(result.maneuverIndex).toBe(-1);
  });
});
