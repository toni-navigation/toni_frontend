import { calculateMedian } from '@/functions/calculateMedian';

describe('calculateMedian', () => {
  it('calculates median for odd length array', () => {
    const values = [1, 2, 3];
    const result = calculateMedian(values);
    expect(result).toBe(2);
  });

  it('calculates median for even length array', () => {
    const values = [1, 2, 3, 4];
    const result = calculateMedian(values);
    expect(result).toBe(2.5);
  });

  it('throws error for empty array', () => {
    const values: number[] = [];
    expect(() => calculateMedian(values)).toThrow('Input array is empty');
  });

  it('calculates median for unsorted array', () => {
    const values = [3, 1, 2];
    const result = calculateMedian(values);
    expect(result).toBe(2);
  });
});
