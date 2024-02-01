import * as Location from 'expo-location';
import {
  CalibrateProps,
  CurrentLocationProps,
  destinationType,
  LocationType,
  PointsProps,
  startType,
} from '../../types/Types';
import { PhotonFeature, PhotonFeatureCollection } from '../../types/api-photon';

const destinationHelper = (
  locationSuggestion: PhotonFeature
): destinationType => {
  const latlng: LocationType = {
    lat: locationSuggestion.geometry.coordinates[1],
    lon: locationSuggestion.geometry.coordinates[0],
  };
  return {
    query: locationSuggestion.properties.name ?? '',
    location: latlng,
    suggestions: null,
  };
};

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

export function suggestionHelper(
  locationSuggestion: PhotonFeature,
  points: PointsProps,
  currentLocation: CurrentLocationProps,
  reverseData: PhotonFeatureCollection
) {
  const newPoints = { ...points };
  newPoints.start = startHelper(currentLocation, reverseData);
  newPoints.destination = destinationHelper(locationSuggestion);
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

export function suggestionsHelper(
  points: PointsProps,
  searchLocationData: PhotonFeatureCollection
) {
  const newPoints = points;
  if (searchLocationData.features?.length > 0) {
    newPoints.destination.suggestions = searchLocationData.features;
  } else {
    newPoints.destination.suggestions = null;
  }
  return newPoints;
}
export const calibrationHelper = (
  position: CurrentLocationProps,
  calibration: CalibrateProps
): CalibrateProps => {
  const newCalibration = { ...calibration };
  if (calibration.start === null) {
    newCalibration.start = {
      lat: position.coords.latitude,
      lon: position.coords.longitude,
      accuary: position.coords.accuracy,
    };
  } else if (newCalibration.start !== null && newCalibration.end === null) {
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
      accuary: position.coords.accuracy,
    };
    newCalibration.meters = distanceInMeter;
    newCalibration.factor = distanceInMeter / 30;
  }
  return newCalibration;
};

export async function getCurrentPosition(): Promise<CurrentLocationProps | null> {
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
