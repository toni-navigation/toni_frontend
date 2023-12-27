import { ChangeEvent, useCallback, useState } from 'react';
import { debounce } from 'lodash';
import {
  fetchSearchDataHandler,
  fetchDirectionsHandler,
  fetchReverseDataHandler,
  getCurrentLocation,
} from './functions';
import { LocationType } from '../types/Types';
import { FeatureProps, SearchProps } from '../types/Nominatim-Types';
import { ValhallaProps } from '../types/Valhalla-Types';

const INITIAL_POINTS: SearchProps[] = [
  {
    id: 0,
    query: '',
    location: null,
    suggestions: null,
  },
  {
    id: 1,
    query: '',
    location: null,
    suggestions: null,
  },
];
function App() {
  const [currentPosition, setCurrentPosition] =
    useState<GeolocationCoordinates>();
  const [directions, setDirections] = useState<ValhallaProps>();
  const [points, setPoints] = useState<SearchProps[]>(INITIAL_POINTS);

  const fetchSuggestions = async (query: string, index: number) => {
    const searchLocationData = await fetchSearchDataHandler(query);

    const newPoints = points;
    if (searchLocationData && searchLocationData?.features?.length > 0) {
      newPoints[index].suggestions = searchLocationData.features;
    } else {
      newPoints[index].suggestions = null;
    }
    setPoints(newPoints);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceFn = useCallback(debounce(fetchSuggestions, 500), []);

  const callDirections = async (directionPoints: LocationType[]) => {
    const newDirections = await fetchDirectionsHandler(directionPoints);
    setDirections(newDirections);
  };
  const currentLocationClickHandler = async () => {
    try {
      const coordinates = await getCurrentLocation();
      const latlng: LocationType = {
        lat: coordinates.latitude,
        lon: coordinates.longitude,
      };

      const coordData = await fetchReverseDataHandler(latlng);
      if (coordData === undefined || coordData?.features?.length === 0) {
        console.error('No data found for the given location');
        return;
      }
      const newPoints = [...points];
      newPoints[0].query =
        coordData.features[0].properties.geocoding.label ?? '';
      newPoints[0].location = latlng;

      if (!newPoints.map((point) => point.location).includes(null)) {
        await callDirections(newPoints.map((point) => point.location));
      }
      setPoints(newPoints);
      setCurrentPosition(coordinates);
    } catch (error) {
      console.error(error);
    }
  };
  const inputChangeHandler = (
    e: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newPoints = [...points];
    newPoints[index].query = e.target.value;
    setPoints(newPoints);
    debounceFn(e.target.value, index);
  };

  const locationSuggestionClickHandler = async (
    locationSuggestion: FeatureProps,
    index: number
  ) => {
    const latlng: LocationType = {
      lat: locationSuggestion.geometry.coordinates[1],
      lon: locationSuggestion.geometry.coordinates[0],
    };
    const newPoints = [...points];
    newPoints[index].query =
      locationSuggestion.properties.geocoding.label ?? '';
    newPoints[index].location = latlng;
    newPoints[index].suggestions = null;

    if (!newPoints.map((point) => point.location).includes(null)) {
      await callDirections(points.map((point) => point.location));
    }
    setPoints(newPoints);
  };
  return (
    <div>
      <h1>BlndFnd</h1>
      <div>
        {'geolocation' in navigator && (
          <button type="button" onClick={currentLocationClickHandler}>
            Current Location
          </button>
        )}
        {currentPosition && (
          <div>
            <div>
              Längen-/Breitengrad: {currentPosition.latitude},{' '}
              {currentPosition.longitude}
            </div>
            <div>accuary:{currentPosition.accuracy}</div>
            <div>altitude:{currentPosition.altitude}</div>
            <div>altitudeAccuracy: {currentPosition.altitudeAccuracy}</div>
            <div>heading:{currentPosition.heading}</div>
            <div>speed:{currentPosition.speed}</div>
          </div>
        )}
        {points.map((point, index) => (
          <div key={point.id}>
            <input
              value={point.query}
              onChange={(e) => inputChangeHandler(e, index)}
            />
            {point.suggestions && point.suggestions.length > 0 && (
              <ul>
                {point.suggestions.map((locationSuggestion) => (
                  <li
                    key={
                      locationSuggestion.properties.geocoding.osm_type +
                      locationSuggestion.properties.geocoding.osm_id
                    }
                  >
                    <button
                      type="button"
                      onClick={(): Promise<void> =>
                        locationSuggestionClickHandler(
                          locationSuggestion,
                          index
                        )
                      }
                    >
                      {locationSuggestion.properties.geocoding.label}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
      {directions &&
        directions.trip &&
        directions.trip.legs &&
        directions.trip.legs[0].maneuvers.map((maneuver) => (
          <div key={maneuver.begin_shape_index + maneuver.end_shape_index}>
            {JSON.stringify(maneuver)}
          </div>
        ))}
    </div>
  );
}
export default App;
