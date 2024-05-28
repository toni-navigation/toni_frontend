import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';

import { Suggestions } from '@/components/organisms/Suggestions';
import { PhotonFeature } from '@/services/api-photon';

describe('Suggestions', () => {
  const mockSuggestionClick = jest.fn();
  const mockSuggestions: PhotonFeature[] = [
    {
      geometry: {
        coordinates: [13.0464806, 47.7981346],
        type: 'Point',
      },
      type: 'Feature',
      properties: {
        osm_type: 'R',
        osm_id: 86538,
        extent: [12.9856478, 47.8543925, 13.1275256, 47.7512115],
        country: 'Österreich',
        osm_key: 'place',
        countrycode: 'AT',
        osm_value: 'city',
        postcode: '5020',
        name: 'Salzburg',
        state: 'Salzburg',
        type: 'city',
      },
    },
    {
      geometry: {
        coordinates: [13.25, 47.4166667],
        type: 'Point',
      },
      type: 'Feature',
      properties: {
        osm_type: 'R',
        osm_id: 86539,
        extent: [12.0760956, 48.0414691, 13.996125, 46.943858],
        country: 'Österreich',
        osm_key: 'place',
        countrycode: 'AT',
        osm_value: 'state',
        name: 'Salzburg',
        type: 'state',
      },
    },
    {
      geometry: {
        coordinates: [13.15605559770756, 47.822490650000006],
        type: 'Point',
      },
      type: 'Feature',
      properties: {
        osm_id: 183194226,
        extent: [13.1524885, 47.8246211, 13.1774412, 47.8203572],
        country: 'Österreich',
        city: 'Koppl',
        countrycode: 'AT',
        postcode: '5321',
        locality: 'Schnurrn',
        county: 'Bezirk Salzburg-Umgebung',
        type: 'house',
        osm_type: 'W',
        osm_key: 'leisure',
        street: 'Wolfgangseestraße',
        district: 'Koppl',
        osm_value: 'sports_centre',
        name: 'Salzburgring',
        state: 'Salzburg',
      },
    },
    {
      geometry: {
        coordinates: [8.0474914, 50.6667428],
        type: 'Point',
      },
      type: 'Feature',
      properties: {
        osm_type: 'R',
        osm_id: 533262,
        extent: [8.0240696, 50.6715229, 8.0587314, 50.6552878],
        country: 'Deutschland',
        osm_key: 'place',
        countrycode: 'DE',
        osm_value: 'village',
        name: 'Salzburg',
        county: 'Westerwaldkreis',
        state: 'Rheinland-Pfalz',
        type: 'city',
      },
    },
    {
      geometry: {
        coordinates: [13.2130752, 47.8197109],
        type: 'Point',
      },
      type: 'Feature',
      properties: {
        osm_type: 'R',
        osm_id: 86671,
        extent: [13.1575321, 47.8357871, 13.2732148, 47.7882792],
        country: 'Österreich',
        osm_key: 'place',
        countrycode: 'AT',
        osm_value: 'village',
        postcode: '5322',
        name: 'Hof bei Salzburg',
        county: 'Bezirk Salzburg-Umgebung',
        state: 'Salzburg',
        type: 'city',
      },
    },
    {
      geometry: {
        coordinates: [13.001830576958724, 47.7934551],
        type: 'Point',
      },
      type: 'Feature',
      properties: {
        osm_id: 30514270,
        extent: [12.9935712, 47.8081986, 13.0137896, 47.77872],
        country: 'Österreich',
        city: 'Salzburg',
        countrycode: 'AT',
        postcode: '5020',
        locality: 'Neu-Maxglan',
        type: 'house',
        osm_type: 'W',
        osm_key: 'aeroway',
        street: 'Kugelhofstraße',
        district: 'Maxglan',
        osm_value: 'aerodrome',
        name: 'Flughafen Salzburg',
        state: 'Salzburg',
      },
    },
    {
      geometry: {
        coordinates: [12.9461482, 47.939935],
        type: 'Point',
      },
      type: 'Feature',
      properties: {
        osm_type: 'R',
        osm_id: 86513,
        extent: [12.9191737, 47.9612182, 12.960095, 47.9317444],
        country: 'Österreich',
        osm_key: 'place',
        countrycode: 'AT',
        osm_value: 'town',
        postcode: '5110',
        name: 'Oberndorf bei Salzburg',
        county: 'Bezirk Salzburg-Umgebung',
        state: 'Salzburg',
        type: 'city',
      },
    },
    {
      geometry: {
        coordinates: [13.0621595, 47.996463],
        type: 'Point',
      },
      type: 'Feature',
      properties: {
        osm_type: 'R',
        osm_id: 86575,
        extent: [13.0263056, 48.0159294, 13.1046766, 47.961797],
        country: 'Österreich',
        osm_key: 'place',
        countrycode: 'AT',
        osm_value: 'village',
        postcode: '5165',
        name: 'Berndorf bei Salzburg',
        county: 'Bezirk Salzburg-Umgebung',
        state: 'Salzburg',
        type: 'city',
      },
    },
    {
      geometry: {
        coordinates: [13.184106133344027, 47.833141499999996],
        type: 'Point',
      },
      type: 'Feature',
      properties: {
        osm_type: 'R',
        osm_id: 86381,
        extent: [12.8601772, 48.0414691, 13.5508672, 47.6248865],
        country: 'Österreich',
        osm_key: 'boundary',
        countrycode: 'AT',
        osm_value: 'administrative',
        name: 'Bezirk Salzburg-Umgebung',
        state: 'Salzburg',
        type: 'county',
      },
    },
    {
      geometry: {
        coordinates: [13.0661371, 47.7825064],
        type: 'Point',
      },
      type: 'Feature',
      properties: {
        osm_type: 'N',
        osm_id: 7540083334,
        country: 'Österreich',
        osm_key: 'place',
        city: 'Salzburg',
        countrycode: 'AT',
        district: 'Salzburg Süd',
        osm_value: 'suburb',
        postcode: '5020',
        name: 'Salzburg-Süd',
        state: 'Salzburg',
        type: 'locality',
      },
    },
    {
      geometry: {
        coordinates: [12.8795575, 47.994607],
        type: 'Point',
      },
      type: 'Feature',
      properties: {
        osm_type: 'R',
        osm_id: 86384,
        extent: [12.8601772, 48.0364455, 12.946774, 47.9504228],
        country: 'Österreich',
        osm_key: 'place',
        countrycode: 'AT',
        osm_value: 'village',
        postcode: '5113',
        name: 'Sankt Georgen bei Salzburg',
        county: 'Bezirk Salzburg-Umgebung',
        state: 'Salzburg',
        type: 'city',
      },
    },
    {
      geometry: {
        coordinates: [13.068932797762766, 47.781291350000004],
        type: 'Point',
      },
      type: 'Feature',
      properties: {
        osm_type: 'R',
        osm_id: 7489973,
        extent: [13.0596332, 47.7953213, 13.0761811, 47.7678766],
        country: 'Österreich',
        osm_key: 'boundary',
        city: 'Salzburg',
        countrycode: 'AT',
        osm_value: 'administrative',
        postcode: '5020',
        name: 'Salzburg Süd',
        state: 'Salzburg',
        type: 'district',
      },
    },
    {
      geometry: {
        coordinates: [12.999965677887332, 47.81241565],
        type: 'Point',
      },
      type: 'Feature',
      properties: {
        osm_id: 30514088,
        extent: [12.9975485, 47.8133938, 13.0015554, 47.8108019],
        country: 'Österreich',
        city: 'Wals-Siezenheim',
        countrycode: 'AT',
        postcode: '5071',
        county: 'Bezirk Salzburg-Umgebung',
        type: 'house',
        osm_type: 'W',
        osm_key: 'leisure',
        street: 'West Autobahn',
        district: 'Siezenheim',
        osm_value: 'sports_centre',
        name: 'Red Bull Salzburg Trainingszentrum',
        state: 'Salzburg',
      },
    },
    {
      geometry: {
        coordinates: [13.04288252697379, 47.802980500000004],
        type: 'Point',
      },
      type: 'Feature',
      properties: {
        osm_id: 54843096,
        extent: [13.0424519, 47.8032174, 13.0432253, 47.8027363],
        country: 'Österreich',
        city: 'Salzburg',
        countrycode: 'AT',
        postcode: '5020',
        type: 'house',
        osm_type: 'W',
        osm_key: 'amenity',
        street: 'Schwarzstraße',
        district: 'Altstadt',
        osm_value: 'theatre',
        name: 'Salzburger Landestheater',
        state: 'Salzburg',
      },
    },
    {
      geometry: {
        coordinates: [13.28461711639229, 47.3886168],
        type: 'Point',
      },
      type: 'Feature',
      properties: {
        osm_type: 'R',
        osm_id: 2121939,
        extent: [12.8093942, 47.4953564, 13.7840049, 47.2818356],
        country: 'Österreich',
        osm_key: 'place',
        countrycode: 'AT',
        osm_value: 'region',
        name: 'Salzburger Schieferalpen',
        type: 'locality',
      },
    },
  ];

  it('renders correctly with given suggestions', () => {
    const { getByText } = render(
      <Suggestions
        suggestions={mockSuggestions}
        onLocationSuggestionClick={mockSuggestionClick}
      />
    );

    expect(getByText('1. Salzburg, Österreich')).toBeTruthy();
    expect(getByText('3. Salzburgring, Wolfgangseestraße, Koppl')).toBeTruthy();
  });

  it('calls onLocationSuggestionClick when a suggestion is clicked', () => {
    const { getByText } = render(
      <Suggestions
        suggestions={mockSuggestions}
        onLocationSuggestionClick={mockSuggestionClick}
      />
    );

    fireEvent.press(getByText('1. Salzburg, Österreich'));

    expect(mockSuggestionClick).toHaveBeenCalledWith(mockSuggestions[0]);
  });
});
