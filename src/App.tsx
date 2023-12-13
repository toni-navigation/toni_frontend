import { ChangeEvent, useCallback, useState } from 'react';
import { debounce } from 'lodash';
import {
  getCurrentLocation,
  fetchSearchDataHandler,
  fetchDirections,
  fetchReverseDataHandler,
} from './functions';
import { FeatureProps, LocationType, SearchProps } from './Types';

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
  const [directions, setDirections] = useState<any>([]);
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

  const debounceFn = useCallback(debounce(fetchSuggestions, 500), []);

  const callDirections = async (directionPoints: LocationType[]) => {
    const newDirections = await fetchDirections(directionPoints);
    setDirections(newDirections);
  };

  const currentLocationClickHandler = async () => {
    try {
      const { coords } = await getCurrentLocation();

      const latlng: LocationType = {
        lat: coords.latitude,
        lon: coords.longitude,
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
    } catch (e) {
      console.error(e);
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
          <div key={maneuver.id}>
            {maneuver.instruction},{maneuver.length * 1000}
          </div>
        ))}
    </div>
  );
}
export default App;
