import { ChangeEvent, useCallback, useState } from 'react';
import { debounce } from 'lodash';
import { fetchTripHandler } from './functions/fetch';
import { CalibrationProps, LocationType } from '../types/Types';
import { FeatureProps, SearchProps } from '../types/Nominatim-Types';
import { ValhallaProps } from '../types/Valhalla-Types';
import {
  currentPositionHelper,
  distanceOfLatLon,
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
  const [calibration, setCalibration] = useState<CalibrationProps>({
    start: null,
    end: null,
    meters: null,
  });

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
      },
      { enableHighAccuracy: true }
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
        },
        { enableHighAccuracy: true }
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

  const calibrateHandler = async () => {
    try {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          if (calibration.start === null) {
            const start = {
              lat: position.coords.latitude,
              lon: position.coords.longitude,
            };
            setCalibration((prevState) => {
              return {
                ...prevState,
                start,
              };
            });
          } else {
            const end = {
              lat: position.coords.latitude,
              lon: position.coords.longitude,
            };
            setCalibration((prevState) => {
              return {
                ...prevState,
                end,
                meters: distanceOfLatLon(
                  prevState.start?.lat ?? 0,
                  prevState.start?.lon ?? 0,
                  end.lat,
                  end.lon,
                  'K'
                ),
              };
            });
          }
        },
        (error) => {
          console.log("Couldn't get current location", error.message);
        },
        { enableHighAccuracy: true }
      );
    } catch (error) {
      console.log(error);
    }
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
  return (
    <div>
      <h1>BlndFnd</h1>
      <div>
        <h2>Kalibrierung</h2>
        <button onClick={calibrateHandler} type="button">
          {calibration.start ? 'Ende' : 'Start'}
        </button>
        <div>
          {calibration.start && (
            <div>
              <div>
                Start: Lat: {calibration.start.lat}, Lon:{calibration.start.lon}
              </div>
            </div>
          )}
          {calibration.end && (
            <div>
              <div>
                End: Lat: {calibration.end.lat} Lon:{calibration.end.lon}
              </div>
            </div>
          )}
        </div>
        {calibration.meters && <div>{calibration.meters}m</div>}
      </div>
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
