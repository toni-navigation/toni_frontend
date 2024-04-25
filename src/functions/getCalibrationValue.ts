import { calculateMedian } from '@/functions/calculateMedian';

export function getCalibrationValue(values: number[]) {
  if (values === undefined || values === null || values.length === 0) {
    return 0;
  }
  if (values.length > 5) {
    return Number(calculateMedian(values).toFixed(2));
  }

  return Number(values[values.length - 1].toFixed(2));
}
