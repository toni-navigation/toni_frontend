// @ts-nocheck

import * as Location from 'expo-location';

import { getCurrentPosition } from '@/functions/getCurrentPosition';

jest.mock('expo-location', () => ({
  requestForegroundPermissionsAsync: jest.fn() as jest.MockedFunction<
    typeof Location.requestForegroundPermissionsAsync
  >,
  getCurrentPositionAsync: jest.fn() as jest.MockedFunction<
    typeof Location.getCurrentPositionAsync
  >,
  Accuracy: {
    High: 'high',
  },
}));

describe('getCurrentPosition', () => {
  it('should return null when permission is not granted', async () => {
    (
      Location.requestForegroundPermissionsAsync as jest.MockedFunction<
        typeof Location.requestForegroundPermissionsAsync
      >
    ).mockResolvedValue({
      status: 'denied',
    });

    const result = await getCurrentPosition();

    expect(result).toBeNull();
  });

  it('should return location when permission is granted', async () => {
    (
      Location.requestForegroundPermissionsAsync as jest.MockedFunction<
        typeof Location.requestForegroundPermissionsAsync
      >
    ).mockResolvedValue({
      status: 'granted',
    });
    (
      Location.getCurrentPositionAsync as jest.MockedFunction<
        typeof Location.getCurrentPositionAsync
      >
    ).mockResolvedValue({
      coords: {
        speed: 0,
        heading: 0,
        accuracy: 0,
        altitudeAccuracy: 0,
        altitude: 0,
        longitude: 13.033229,
        latitude: 47.811195,
      },
      timestamp: 0,
    });

    const result = await getCurrentPosition();

    expect(result).toEqual({
      coords: {
        speed: 0,
        heading: 0,
        accuracy: 0,
        altitudeAccuracy: 0,
        altitude: 0,
        longitude: 13.033229,
        latitude: 47.811195,
      },
      timestamp: 0,
    });
  });
});
