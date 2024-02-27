import { LocationProps, PointsProps } from '../../types/Types';
import { PhotonFeature } from '../../types/api-photon';

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
