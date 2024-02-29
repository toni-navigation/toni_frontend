import { distanceOfLatLon } from './functions';

test('distance of coordinates', () => {
  expect(
    distanceOfLatLon(
      40.689202777778,
      -74.044219444444,
      38.889069444444,
      -77.034502777778,
      'K'
    )
  ).toBe(324.5192777035608);
});
//TODO add more tests
//TODO test calibration if 0
