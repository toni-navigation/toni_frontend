// @ts-nocheck

import { matchIconType } from '@/functions/matchIconType';

describe('matchIconType', () => {
  it('should return arrowRight for directionsType 10', () => {
    const directionType = 10;
    const result = matchIconType(directionType);

    expect(result).toEqual('arrowRight');
  });

  it('should return arrowLeft for directionsType 15', () => {
    const directionType = 15;
    const result = matchIconType(directionType);

    expect(result).toEqual('arrowLeft');
  });

  it('should return arrowStraight for any number except 9,10,11,14,15,16', () => {
    const directionType = 8;
    const result = matchIconType(directionType);

    expect(result).toEqual('arrowStraight');
  });
});
