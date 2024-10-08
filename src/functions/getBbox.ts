import bbox from '@turf/bbox';
import circle from '@turf/circle';
import { point } from '@turf/helpers';
import { LocationObject } from 'expo-location';

export const getBbox = (currentPosition: LocationObject, radius = 10) => {
  if (!currentPosition) return undefined;

  const center = point([
    currentPosition.coords.longitude,
    currentPosition.coords.latitude,
  ]);

  const circleAroundPoint = circle(center, radius, { units: 'kilometers' });

  return bbox(circleAroundPoint);
};
