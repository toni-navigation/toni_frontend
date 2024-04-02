import { parseCoordinate } from '@/functions/parseCoordinate';

describe('parseCoordinate', () => {
  it('parses coordinate string correctly', () => {
    const coordinateString = '123.456,78.90';
    const result = parseCoordinate(coordinateString);
    expect(result).toEqual({ lat: 78.9, lon: 123.456 });
  });

  it('returns NaN for non-numeric input', () => {
    const coordinateString = 'abc,def';
    const result = parseCoordinate(coordinateString);
    expect(result).toEqual({ lat: NaN, lon: NaN });
  });

  it('returns NaN for empty input', () => {
    const coordinateString = ',';
    const result = parseCoordinate(coordinateString);
    expect(result).toEqual({ lat: NaN, lon: NaN });
  });

  it('returns NaN for missing latitude', () => {
    const coordinateString = '123.456,';
    const result = parseCoordinate(coordinateString);
    expect(result).toEqual({ lat: NaN, lon: 123.456 });
  });

  it('returns NaN for missing longitude', () => {
    const coordinateString = ',78.90';
    const result = parseCoordinate(coordinateString);
    expect(result).toEqual({ lat: 78.9, lon: NaN });
  });
});
