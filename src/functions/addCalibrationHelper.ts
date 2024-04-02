import distance from '@turf/distance';
import * as turf from '@turf/helpers';

import { CalibrationProps, CurrentLocationType } from '@/types/Types';

export const addCalibrationHelper = (
  start: CurrentLocationType,
  end: CurrentLocationType,
  steps: number,
  calibration: CalibrationProps
): CalibrationProps => {
  if (start && end) {
    const from = turf.point([start.coords.longitude, start.coords.latitude]);
    const to = turf.point([end.coords.longitude, end.coords.latitude]);
    const distanceInMeter = distance(from, to) * 1000;
    calibration.meters.push(distanceInMeter);
    calibration.factors.push(distanceInMeter / steps);
  }

  return calibration;
};
