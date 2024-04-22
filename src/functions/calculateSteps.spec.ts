import { calculateSteps } from '@/functions/calculateSteps';

describe('calculateSteps', () => {
  it('calculates steps with length and factor 1', () => {
    const length = 1;
    const factor = 1;
    const result = calculateSteps(length, factor);
    expect(result).toBe(1000);
  });

  it('calculates steps with length 1 and factor 0', () => {
    const length = 1;
    const factor = 0;
    const result = calculateSteps(length, factor);
    expect(result).toBe(1);
  });
});
