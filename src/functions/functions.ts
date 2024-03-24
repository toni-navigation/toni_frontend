import { Audio, AVPlaybackSource } from 'expo-av';
import * as Location from 'expo-location';
import { PhotonFeature } from 'src/services/api-photon';

import { ValhallaManeuverProps } from '@/types/Valhalla-Types';

export const parseCoordinate = (coordinateString: string) => {
  const [lon, lat] = coordinateString.split(',');

  return { lat: Number(lat), lon: Number(lon) };
};

export function photonValue(feature: PhotonFeature) {
  return `${feature.properties.name} ${feature.properties.postcode} ${feature.properties.city},
  ${feature.properties.country}`;
}

export function calculateMedian(values: number[]): number {
  if (values.length === 0) {
    throw new Error('Input array is empty');
  }
  // Sorting values, preventing original array
  // from being mutated.
  const sortedValues = [...values].sort((a, b) => a - b);

  const half = Math.floor(sortedValues.length / 2);

  return sortedValues.length % 2
    ? sortedValues[half]
    : (sortedValues[half - 1] + sortedValues[half]) / 2;
}
export function getCalibrationValue(values: number[]) {
  if (values === undefined || values === null || values.length === 0) {
    return 0;
  }
  if (values.length > 5) {
    return calculateMedian(values);
  }

  return values[values.length - 1];
}
export async function getCurrentPosition() {
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') {
    return null;
  }

  const location = await Location.getCurrentPositionAsync({
    accuracy: Location.Accuracy.High,
  });

  return {
    coords: {
      speed: location.coords.speed,
      heading: location.coords.heading,
      accuracy: location.coords.accuracy,
      altitudeAccuracy: location.coords.altitudeAccuracy,
      altitude: location.coords.altitude,
      longitude: location.coords.longitude,
      latitude: location.coords.latitude,
    },
    timestamp: location.timestamp,
  };
}

export const valueOutput = (
  maneuver: ValhallaManeuverProps,
  factor: number
) => {
  if (factor) {
    return `${maneuver.instruction} ${maneuver.length * 1000} Meter, Schritte: ${Math.ceil((maneuver.length * 1000) / factor)}`;
  }

  return `${maneuver.instruction} ${maneuver.length * 1000} Meter`;
};

export async function playSound(source: AVPlaybackSource) {
  let sound: Audio.Sound | null = null;
  sound = new Audio.Sound();

  await sound.loadAsync(source);
  await sound.playAsync();
  await Audio.setAudioModeAsync({
    playsInSilentModeIOS: true,
  });

  return sound;
}

export async function stopSound(sound: Audio.Sound) {
  await sound.unloadAsync();
  await Audio.setAudioModeAsync({
    playsInSilentModeIOS: false,
  });

  return sound;
}
