import circle from '@turf/circle';
import * as turf from '@turf/helpers';
import { Units } from '@turf/helpers';

describe('getCircle', () => {
  it('should return a circle with the correct radius', () => {
    const center = [-75.343, 39.984];
    const radius = 5;
    const options = {
      steps: 4,
      units: 'kilometers' as Units,
    };
    const perimeter = circle(center, radius, options);
    // const circle = getCircle(10);
    expect(perimeter.geometry.coordinates).toStrictEqual([
      [
        [-75.343, 40.02896601818623],
        [-75.40168521055865, 39.983985202669075],
        [-75.343, 39.93903398181377],
        [-75.28431478944134, 39.983985202669075],
        [-75.343, 40.02896601818623],
      ],
    ]);
  });
});
