import { jest } from '@jest/globals';
import distance from '@turf/distance';
import * as turf from '@turf/helpers';

import { addCalibrationHelper } from '@/functions/addCalibrationHelper';
import { CalibrationProps, CurrentLocationType } from '@/types/Types';

describe('addCalibrationHelper', () => {
  let start: CurrentLocationType;
  let end: CurrentLocationType;
  let steps: number;
  let calibration: CalibrationProps;

  beforeEach(() => {
    start = { coords: { longitude: 0, latitude: 0 } };
    end = { coords: { longitude: 1, latitude: 1 } };
    steps = 10;
    calibration = { meters: [], factors: [] };
  });
  it('calculates the distance correctly', () => {
    const from = turf.point([13.06576, 47.783402]);
    const to = turf.point([13.064906, 47.782828]);
    const distanceInMeter = distance(from, to) * 1000;
    expect(parseFloat(distanceInMeter.toFixed(2))).toBe(90.25);
  });
  it('adds distance and factor to calibration when start and end are provided', () => {
    const pointSpy = jest.spyOn(turf, 'point');
    // const distanceSpy = jest.spyOn(distance, 'distance');

    addCalibrationHelper(start, end, steps, calibration);

    expect(pointSpy).toHaveBeenCalledTimes(2);
    // expect(distanceSpy).toHaveBeenCalledTimes(1);
    expect(calibration.meters.length).toBe(1);
    expect(calibration.factors.length).toBe(1);
  });

  it('does not add distance and factor to calibration when start is not provided', () => {
    addCalibrationHelper(null, end, steps, calibration);

    expect(calibration.meters.length).toBe(0);
    expect(calibration.factors.length).toBe(0);
  });

  it('does not add distance and factor to calibration when end is not provided', () => {
    addCalibrationHelper(start, null, steps, calibration);

    expect(calibration.meters.length).toBe(0);
    expect(calibration.factors.length).toBe(0);
  });
});
