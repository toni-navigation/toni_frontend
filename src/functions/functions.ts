import { Audio, AVPlaybackSource } from 'expo-av';
import * as Location from 'expo-location';
import { Pedometer } from 'expo-sensors';
import { PhotonFeature } from 'src/services/api-photon';

import { LocationProps, PointsProps } from '@/types/Types';
import { ValhallaManeuverProps } from '@/types/Valhalla-Types';

/*
const startHelper = (
  currentLocation: CurrentLocationProps,
  reverseData: PhotonFeatureCollection
): startType => {
  const latlng: LocationType = {
    lat: currentLocation.coords.latitude,
    lon: currentLocation.coords.longitude,
  };
  return {
    query: reverseData.features[0].properties.name ?? '',
    location: latlng,
  };
};
*/
export function photonValue(feature: PhotonFeature) {
  return `${feature.properties.name} ${feature.properties.postcode} ${feature.properties.city},
  ${feature.properties.country}`;
}
export function suggestionHelper(
  locationSuggestion: PhotonFeature,
  points: PointsProps,
  startOrDestination: string
) {
  const newPoints = { ...points };
  const latlng: LocationProps = {
    lat: locationSuggestion.geometry.coordinates[1],
    lon: locationSuggestion.geometry.coordinates[0],
  };
  if (startOrDestination === 'start') {
    newPoints.start = {
      query: locationSuggestion.properties.name ?? '',
      location: latlng,
      suggestions: null,
    };
  }
  if (startOrDestination === 'destination') {
    newPoints.destination = {
      query: locationSuggestion.properties.name ?? '',
      location: latlng,
      suggestions: null,
    };
  }

  return newPoints;
}

export function distanceOfLatLon(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
  unit: 'K' | 'N'
) {
  const radlat1 = (Math.PI * lat1) / 180;
  const radlat2 = (Math.PI * lat2) / 180;
  const theta = lon1 - lon2;
  const radtheta = (Math.PI * theta) / 180;
  let dist =
    Math.sin(radlat1) * Math.sin(radlat2) +
    Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
  dist = Math.acos(dist);
  dist = (dist * 180) / Math.PI;
  dist = dist * 60 * 1.1515;
  if (unit === 'K') {
    dist *= 1.609344;
  }
  if (unit === 'N') {
    dist *= 0.8684;
  }

  return dist;
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

export async function pedometerCallback() {
  const isAvailable = await Pedometer.isAvailableAsync();
  if (!isAvailable) {
    return null;
  }

  return Pedometer.watchStepCount;
}

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
/*
export function suggestionsHelper(
  points: PointsProps,
  searchLocationData: PhotonFeature[]
) {
  const newPoints = points;
  if (searchLocationData.length > 0) {
    newPoints.destination.suggestions = searchLocationData;
  }
  return newPoints;
}

export const calibrationHelper = (
  position: CurrentLocationProps,
  calibration: CalibrationProps
): CalibrationProps => {
  if (newCalibration.start === null) {
    newCalibration.start = {
      lat: position.coords.latitude,
      lon: position.coords.longitude,
      accuracy: position.coords.accuracy ?? undefined,
    };
  } else if (newCalibration.end === undefined) {
    const distanceInMeter =
      distanceOfLatLon(
        newCalibration.start.lat,
        newCalibration.start.lon,
        position.coords.latitude,
        position.coords.longitude,
        'K'
      ) * 1000;
    newCalibration.end = {
      lat: position.coords.latitude,
      lon: position.coords.longitude,
      accuracy: position.coords.accuracy ?? undefined,
    };
    newCalibration.meters = distanceInMeter;
    newCalibration.factor = distanceInMeter / 30;
  }
  return newCalibration;
};
*/
