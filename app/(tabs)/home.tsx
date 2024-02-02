import React, { useCallback, useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import {
  CalibrateProps,
  CurrentLocationProps,
  LocationType,
  PointsProps,
} from '../../types/Types';
import { ValhallaProps } from '../../types/Valhalla-Types';
import {
  fetchReverseDataHandler,
  fetchSearchDataHandler,
  fetchTripHandler,
} from '../../src/functions/fetch';
import {
  calibrationHelper,
  getCurrentPosition,
  suggestionHelper,
  suggestionsHelper,
} from '../../src/functions/functions';
import { debounce } from 'lodash';
import { FeatureProps } from '../../types/Nominatim-Types';
import Destination from '../../src/pages/Destination';
import Suggestions from '../../src/components/organisms/Suggestions';
import Button from '../../src/components/atoms/Button';
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
const Home = () => {
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
    const searchLocationData = await fetchSearchDataHandler(query);
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
    <View>
      <Destination
        query={points.destination.query}
        onDestinationChange={inputChangeHandler}
      />
      {points.destination.suggestions && (
        <Suggestions
          suggestions={points.destination.suggestions}
          onLocationSuggestionClick={locationSuggestionClickHandler}
        />
      )}
      <View>
        <Button
          onPress={() => {}}
          // disabled={currentLocation === null || currentLocation === undefined}
          buttonType={'primary'}
        >
          Weiter
        </Button>
      </View>
    </View>
  );
};

export default Home;
