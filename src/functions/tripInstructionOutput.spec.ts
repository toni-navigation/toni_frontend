// @ts-nocheck

import { tripInstructionOutput } from '@/functions/tripInstructionOutput';

describe('tripInstructionOutput', () => {
  it('should return instruction with distance and steps when factor is provided', () => {
    const maneuver = { instruction: 'Turn right', length: 0.5 };
    const factor = 2;
    const result = tripInstructionOutput(maneuver, factor);

    expect(result).toEqual('Turn right 500 Meter, Schritte: 250');
  });

  it('should return instruction with distance only when factor is not provided', () => {
    const maneuver = { instruction: 'Turn left', length: 1 };
    const result = tripInstructionOutput(maneuver, undefined);

    expect(result).toEqual('Turn left 1000 Meter');
  });
});
