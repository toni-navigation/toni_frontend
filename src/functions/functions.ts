import { LocationType } from '../../types/Types';
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
