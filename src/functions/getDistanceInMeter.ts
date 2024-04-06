import distance from '@turf/distance';
import * as turf from '@turf/helpers';

import { CurrentLocationType } from '@/types/Types';

export const getDistanceInMeter = (
  start: CurrentLocationType,
  end: CurrentLocationType
): number | null => {
  if (!start || !end) return null;
  const from = turf.point([start.coords.longitude, start.coords.latitude]);
  const to = turf.point([end.coords.longitude, end.coords.latitude]);

  return distance(from, to) * 1000;
};
