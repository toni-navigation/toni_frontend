import { ChangeEvent, useCallback, useState } from 'react';
import { debounce } from 'lodash';
import { fetchTripHandler } from './functions/fetch';
import { LocationType } from '../types/Types';
import { FeatureProps, SearchProps } from '../types/Nominatim-Types';
import { ValhallaProps } from '../types/Valhalla-Types';
import {
  currentPositionHelper,
  suggestionHelper,
  suggestionsHelper,
} from './functions/functions';
import Map from './Map';
import CurrentLocation from './CurrentLocation';
import Point from './Point';
import Trip from './Trip';

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
  const [currentLocation, setCurrentLocation] =
    useState<GeolocationCoordinates>();
  const [trip, setTrip] = useState<ValhallaProps>();
  const [points, setPoints] = useState<SearchProps[]>(INITIAL_POINTS);

  const suggestionsHandler = async (query: string, index: number) => {
    const newPoints = await suggestionsHelper(query, index, points);
    setPoints(newPoints);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceFn = useCallback(debounce(suggestionsHandler, 500), []);

  const callTrip = async (tripPoints: LocationType[]) => {
    const newTrip = await fetchTripHandler(tripPoints);
    setTrip(newTrip);
  };
  const watchPositionHandler = async () => {
    navigator.geolocation.watchPosition(
      (position) => {
        setCurrentLocation(position.coords);
      },
      (error) => {
        console.log(error);
      }
    );
  };
  const currentLocationClickHandler = async () => {
    try {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const newPoints = await currentPositionHelper(position, points);
          if (newPoints === undefined) {
            return;
          }
          if (!newPoints.map((point) => point.location).includes(null)) {
            await callTrip(newPoints.map((point) => point.location));
          }
          setPoints(newPoints);
          watchPositionHandler();
        },
        (error) => {
          console.log("Couldn't get current location", error.message);
        }
      );
    } catch (error) {
      console.log(error);
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
    const newPoints = suggestionHelper(locationSuggestion, index, points);
    if (!newPoints.map((point) => point.location).includes(null)) {
      await callTrip(points.map((point) => point.location));
    }
    setPoints(newPoints);
  };
  console.log(trip);
  return (
    <div>
      <h1>BlndFnd</h1>

      <div>
        {'geolocation' in navigator && (
          <button type="button" onClick={currentLocationClickHandler}>
            Current Location
          </button>
        )}
        {currentLocation && (
          <CurrentLocation currentLocation={currentLocation} />
        )}
        {points.map((point, index) => (
          <Point
            key={point.id}
            point={point}
            onInputChange={inputChangeHandler}
            index={index}
            onLocationSuggestionClick={locationSuggestionClickHandler}
          />
        ))}
      </div>
      {trip &&
        trip.trip &&
        trip.trip.legs &&
        trip.trip.legs[0].maneuvers.map((maneuver) => (
          <Trip
            key={maneuver.begin_shape_index + maneuver.end_shape_index}
            maneuver={maneuver}
          />
        ))}
      <Map
        currentLocation={currentLocation}
        points={points.map((point) => {
          return {
            id: point.id,
            location: point.location,
          };
        })}
        shape={trip?.trip?.legs[0].shape}
      />
    </div>
  );
}
export default App;
