// @ts-nocheck

import { photonValue } from '@/functions/photonValue';
import { PhotonFeature } from '@/services/api-photon';

describe('photonValue', () => {
  it('should return a formatted string with name, street, housenumber, and city', () => {
    const feature: PhotonFeature = {
      properties: {
        name: 'Test Name',
        street: 'Test Street',
        housenumber: '123',
        city: 'Test City',
        country: 'Test Country',
      },
    };

    const result = photonValue(feature);
    expect(result).toEqual('Test Name, Test Street 123, Test City');
  });

  it('should return a formatted string with name, street, and country when city is not provided', () => {
    const feature: PhotonFeature = {
      properties: {
        name: 'Test Name',
        street: 'Test Street',
        housenumber: '123',
        country: 'Test Country',
      },
    };

    const result = photonValue(feature);
    expect(result).toEqual('Test Name, Test Street 123, Test Country');
  });

  it('should return a formatted string with name and street when housenumber is not provided', () => {
    const feature: PhotonFeature = {
      properties: {
        name: 'Test Name',
        street: 'Test Street',
        city: 'Test City',
        country: 'Test Country',
      },
    };

    const result = photonValue(feature);
    expect(result).toEqual('Test Name, Test Street, Test City');
  });

  it('should return an empty string when no properties are provided', () => {
    const feature: PhotonFeature = {
      properties: {},
    };

    const result = photonValue(feature);
    expect(result).toEqual('');
  });
});
