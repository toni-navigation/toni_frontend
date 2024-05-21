import { decodePolyline } from '@/functions/decodePolyline';

describe('decodePolyline', () => {
  it('decodes a valid polyline string with default precision', () => {
    const result = decodePolyline('_p~iF~ps|U_ulLnnqC_mqNvxq`@');
    expect(result.coordinates.length).toBeGreaterThan(0);
    expect(result.index).toBeGreaterThan(0);
  });

  it('decodes a valid polyline string with custom precision', () => {
    const result = decodePolyline('_p~iF~ps|U_ulLnnqC_mqNvxq`@', 5);
    expect(result.coordinates.length).toBeGreaterThan(0);
    expect(result.index).toBeGreaterThan(0);
  });

  it('returns empty coordinates for an empty polyline string', () => {
    const result = decodePolyline('');
    expect(result.coordinates.length).toBe(0);
  });

  it('throws an error for a null polyline string', () => {
    expect(() => decodePolyline(null as any)).toThrow();
  });

  it('throws an error for an undefined polyline string', () => {
    expect(() => decodePolyline(undefined as any)).toThrow();
  });
});
