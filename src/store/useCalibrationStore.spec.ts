import distance from '@turf/distance';
import * as turf from '@turf/helpers';

describe('useCalibrationStore', () => {
  it('calculates the distance correctly', () => {
    const from = turf.point([13.06576, 47.783402]);
    const to = turf.point([13.064906, 47.782828]);
    const distanceInMeter = distance(from, to) * 1000;
    expect(parseFloat(distanceInMeter.toFixed(2))).toBe(90.25);
  });
});
