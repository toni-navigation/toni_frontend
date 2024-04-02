import bbox from '@turf/bbox';
import circle from '@turf/circle';
import { point } from '@turf/helpers';

import { CurrentLocationProps } from '@/types/Types';

export const getBbox = (currentPosition: CurrentLocationProps, radius = 10) => {
  if (!currentPosition) return undefined;

  const center = point([
    currentPosition.coords.longitude,
    currentPosition.coords.latitude,
  ]);

  const circleAroundPoint = circle(center, radius, { units: 'kilometers' });

  return bbox(circleAroundPoint);
};
