import { getCalibrationValue } from '@/functions/getCalibrationValue';

describe('getCalibrationValue', () => {
  it('returns zero for undefined input', () => {
    const result = getCalibrationValue(undefined!);
    expect(result).toBe(0);
  });

  it('returns zero for null input', () => {
    const result = getCalibrationValue(null!);
    expect(result).toBe(0);
  });

  it('returns zero for empty array', () => {
    const result = getCalibrationValue([]);
    expect(result).toBe(0);
  });

  it('returns median for array length greater than 5', () => {
    const values = [1, 2, 3, 4, 5, 6];
    const result = getCalibrationValue(values);
    expect(result).toBe(3.5);
  });

  it('returns last value for array length less than or equal to 5', () => {
    const values = [1, 2, 3, 4, 5];
    const result = getCalibrationValue(values);
    expect(result).toBe(5);
  });
});
