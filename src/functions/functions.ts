import { CalibrationProps, LocationType } from '../../types/Types';
import { FeatureProps, SearchProps } from '../../types/Nominatim-Types';
import { fetchReverseDataHandler, fetchSearchDataHandler } from './fetch';

export function suggestionHelper(
  locationSuggestion: FeatureProps,
  index: number,
  points: SearchProps[]
) {
  const latlng: LocationType = {
    lat: locationSuggestion.geometry.coordinates[1],
    lon: locationSuggestion.geometry.coordinates[0],
  };
  const newPoints = [...points];
  newPoints[index].query = locationSuggestion.properties.geocoding.label ?? '';
  newPoints[index].location = latlng;
  newPoints[index].suggestions = null;
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
export async function currentPositionHelper(
  position: GeolocationPosition,
  points: SearchProps[]
): Promise<SearchProps[] | undefined> {
  const latlng: LocationType = {
    lat: position.coords.latitude,
    lon: position.coords.longitude,
  };
  const coordData = await fetchReverseDataHandler(latlng);
  if (coordData === undefined || coordData?.features?.length === 0) {
    console.error('No data found for the given location');
    return undefined;
  }
  const newPoints = [...points];
  newPoints[0].query = coordData.features[0].properties.geocoding.label ?? '';
  newPoints[0].location = latlng;
  return newPoints;
}

export async function suggestionsHelper(
  query: string,
  index: number,
  points: SearchProps[]
) {
  const searchLocationData = await fetchSearchDataHandler(query);

  const newPoints = points;
  if (searchLocationData && searchLocationData?.features?.length > 0) {
    newPoints[index].suggestions = searchLocationData.features;
  } else {
    newPoints[index].suggestions = null;
  }
  return newPoints;
}

export const calibrationHelper = (
  position: GeolocationPosition,
  calibration: CalibrationProps
): CalibrationProps => {
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

export async function getCurrentPosition(
  callback: (userPosition: GeolocationPosition) => void
) {
  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };
  const onSuccess = (position: GeolocationPosition) => {
    callback(position);
  };
  const onError = (error: GeolocationPositionError) => {
    console.error(error);
  };

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(onSuccess, onError, options);
  } else {
    alert('Geolocation is not supported by this browser.');
  }
}
