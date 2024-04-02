import circle from '@turf/circle';
import { Units } from '@turf/helpers';

import { CurrentLocationType } from '@/types/Types';

export const getBbox = (
  currentPosition: CurrentLocationType,
  steps = 4,
  radius = 50
) => {
  if (!currentPosition) return undefined;
  const center = [
    currentPosition.coords.longitude,
    currentPosition.coords.latitude,
  ];
  const options = {
    steps,
    units: 'kilometers' as Units,
  };
  const perimeter = circle(center, radius, options);

  return {
    coords: perimeter.geometry.coordinates[0],
    bbox: perimeter.geometry.coordinates[0].map((coord) => ({
      latitude: coord[1],
      longitude: coord[0],
    })),
  };
};
