import React, { useCallback, useEffect, useState } from 'react';
import { View, SafeAreaView } from 'react-native';
import { debounce } from 'lodash';
import { ValhallaProps } from './types/Valhalla-Types';
import {
  CalibrateProps,
  CurrentLocationProps,
  LocationType,
  PointsProps,
} from './types/Types';
import {
  calibrationHelper,
  getCurrentPosition,
  suggestionHelper,
  suggestionsHelper,
} from './src/functions/functions';
import {
  fetchReverseDataHandler,
  fetchSearchDataHandler,
  fetchTripHandler,
} from './src/functions/fetch';
import Pages from './src/Pages';
import { FeatureProps } from './types/Photon-Types';

const INITIAL_POINTS: PointsProps = {
  start: {
    query: '',
    location: null,
  },
  destination: {
    query: '',
    location: null,
    suggestions: null,
  },
};
export default function App() {
  const [currentLocation, setCurrentLocation] =
    useState<CurrentLocationProps | null>();
  const [trip, setTrip] = useState<ValhallaProps | null>();
  const [points, setPoints] = useState<PointsProps>(INITIAL_POINTS);
  const [calibration, setCalibration] = useState<CalibrateProps>({
    start: null,
    end: null,
    meters: null,
    factor: null,
  });
  const [currentPage, setCurrentPage] = useState<number>(0);

  const suggestionsHandler = async (query: string) => {
    const prioPosition =
      currentLocation?.coords.latitude && currentLocation?.coords.longitude
        ? {
            lat: currentLocation?.coords.latitude,
            lon: currentLocation?.coords.longitude,
          }
        : null;
    const searchLocationData = await fetchSearchDataHandler(
      query,
      prioPosition
    );
    if (searchLocationData) {
      const newPoints = suggestionsHelper(points, searchLocationData);
      setPoints(newPoints);
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceFn = useCallback(debounce(suggestionsHandler, 500), []);

  const callTrip = async (newPoints: PointsProps) => {
    const startAndDestination: LocationType[] = [
      newPoints.start.location,
      newPoints.destination.location,
    ];
    const newTrip = await fetchTripHandler(startAndDestination);
    setTrip(newTrip);
  };

  const inputChangeHandler = (value: string) => {
    const newPoints = { ...points };
    newPoints.destination.query = value;
    setPoints(newPoints);
    debounceFn(value);
  };
  const nextPageHandler = () => {
    setCurrentPage((prevState) => prevState + 1);
  };
  const previousPageHandler = () => {
    setCurrentPage((prevState) => (prevState > 0 ? prevState - 1 : prevState));
  };
  const locationSuggestionClickHandler = async (
    locationSuggestion: FeatureProps
  ) => {
    nextPageHandler();
    if (currentLocation) {
      const start = {
        lat: currentLocation.coords.latitude,
        lon: currentLocation.coords.longitude,
      };
      const reverseData = await fetchReverseDataHandler(start);
      if (reverseData) {
        const newPoints = suggestionHelper(
          locationSuggestion,
          points,
          currentLocation,
          reverseData
        );
        await callTrip(newPoints);
        setPoints(newPoints);
      }
    }
  };

  const calibrationHandler = () => {
    if (currentLocation) {
      const newCalibration = calibrationHelper(currentLocation, calibration);
      setCalibration((prevState) => {
        return {
          ...prevState,
          ...newCalibration,
        };
      });
    }
  };

  useEffect(() => {
    (async () => {
      const position = await getCurrentPosition();
      setCurrentLocation(position);
    })();
  }, []);

  return (
    <SafeAreaView>
      <View className="p-5 h-screen pb-20 relative">
        <Pages
          currentPage={currentPage}
          onCalibrate={calibrationHandler}
          calibration={calibration}
          onClickNext={nextPageHandler}
          points={points}
          onDestinationChange={inputChangeHandler}
          onLocationSuggestionClick={locationSuggestionClickHandler}
          currentLocation={currentLocation}
          trip={trip}
          onClickPrevious={previousPageHandler}
        />
      </View>
    </SafeAreaView>
  );
}
