import { getDistanceInMeter } from '@/functions/getDistanceInMeter';
import { CurrentLocationType } from '@/types/Types';

describe('getDistanceInMeter', () => {
  it('calculates the correct distance between two points', () => {
    const start: CurrentLocationType = {
      coords: { longitude: 0, latitude: 0 },
    };
    const end: CurrentLocationType = { coords: { longitude: 1, latitude: 1 } };
    const result = getDistanceInMeter(start, end);
    expect(result).toBeCloseTo(157249.5984740402);
  });

  it('returns null when start is not provided', () => {
    const end: CurrentLocationType = { coords: { longitude: 1, latitude: 1 } };
    const result = getDistanceInMeter(null, end);
    expect(result).toBeNull();
  });

  it('returns null when end is not provided', () => {
    const start: CurrentLocationType = {
      coords: { longitude: 0, latitude: 0 },
    };
    const result = getDistanceInMeter(start, null);
    expect(result).toBeNull();
  });

  it('returns null when both start and end are not provided', () => {
    const result = getDistanceInMeter(null, null);
    expect(result).toBeNull();
  });
});
