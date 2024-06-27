import { PhotonService } from '@/services/api-photon';

const REVERSE_STUB = {
  features: [
    {
      geometry: {
        coordinates: [13.064790581740347, 47.7825593],
        type: 'Point',
      },
      type: 'Feature',
      properties: {
        osm_id: 113413548,
        extent: [13.0646884, 47.7826473, 13.0649054, 47.7824891],
        country: 'Österreich',
        city: 'Salzburg',
        countrycode: 'AT',
        postcode: '5020',
        locality: 'Salzburg-Süd',
        type: 'house',
        osm_type: 'W',
        osm_key: 'building',
        housenumber: '27',
        street: 'Erentrudisstraße',
        district: 'Salzburg Süd',
        osm_value: 'detached',
        state: 'Salzburg',
      },
    },
  ],
  type: 'FeatureCollection',
};
describe('Geocoding Integration', () => {
  it('should integrate with Photons reverse Geocoding', async () => {
    const location = { lat: 47.782711, lon: 13.064801 };
    const result = await PhotonService.reverse(location);
    expect(result).toEqual(REVERSE_STUB);
  });
});
