import { PhotonService } from '@/services/api-photon';

const GEO_STUB = {
  features: [
    {
      geometry: {
        coordinates: [13.089052042298047, 47.723105000000004],
        type: 'Point',
      },
      type: 'Feature',
      properties: {
        osm_id: 133493338,
        extent: [13.0888115, 47.7233221, 13.0892701, 47.7228861],
        country: 'Österreich',
        city: 'Puch bei Hallein',
        countrycode: 'AT',
        postcode: '5412',
        county: 'Bezirk Hallein',
        type: 'house',
        osm_type: 'W',
        osm_key: 'building',
        housenumber: '2',
        street: 'Urstein Süd',
        osm_value: 'retail',
        name: 'Spar',
        state: 'Salzburg',
      },
    },
  ],
  type: 'FeatureCollection',
};

describe('Geocoding Integration', () => {
  it('should integrate with Photon', async () => {
    const parameters = {
      bbox: '12.9309625644484,47.69277896362753,13.1986394355516,47.872643036372445',
      lang: 'de',
      limit: 5,
      q: 'Spar puch',
    };

    const result = await PhotonService.geocoding(parameters);
    expect(result).toEqual(GEO_STUB);
  });
});
