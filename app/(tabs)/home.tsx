import React, { useCallback, useEffect, useState } from 'react';
import { router } from 'expo-router';
import { ActivityIndicator, Text, View } from 'react-native';
import { debounce } from 'lodash';
import Button from '../../src/components/atoms/Button';
import { suggestionHelper } from '../../src/functions/functions';
import Destination from '../../src/pages/Destination';
import Suggestions from '../../src/components/organisms/Suggestions';
import { PhotonFeature } from '../../types/api-photon';
import useUserStore from '../../store/useUserStore';
import {
  useReverseData,
  useSearchData,
  useTrip,
} from '../../src/functions/mutations';
import { LocationProps, PointsProps } from '../../types/Types';
import StartPosition from '../../src/pages/StartPosition';

const INITIAL_POINTS: PointsProps = {
  start: {},
  destination: {
    query: '',
  },
};
export default function Home() {
  const [points, setPoints] = useState<PointsProps>(INITIAL_POINTS);

  const { actions, currentLocation } = useUserStore();

  const searchData = useSearchData(currentLocation);
  const reverseData = useReverseData();

  const start = {
    lat: currentLocation?.coords.latitude,
    lon: currentLocation?.coords.longitude,
  };
  const tripPoints: (LocationProps | undefined | null)[] = [
    start,
    points.destination.location,
  ];
  const tripData = useTrip();

  const suggestionsHandlerDestination = async (query: string) => {
    const data = await searchData.mutateAsync(query);
    const newPoints = { ...points };
    newPoints.destination.suggestions = data;
    setPoints(newPoints);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceFnDestination = useCallback(
    debounce(suggestionsHandlerDestination, 500),
    []
  );

  const suggestionsHandlerStart = async (query: string) => {
    const data = await searchData.mutateAsync(query);
    const newPoints = { ...points };
    newPoints.start.suggestions = data;
    setPoints(newPoints);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceFnStart = useCallback(
    debounce(suggestionsHandlerStart, 500),
    []
  );

  const inputChangeHandler = (value: string) => {
    const newPoints = { ...points };
    newPoints.destination.query = value;
    setPoints(newPoints);
    debounceFnDestination(value);
  };

  const inputChangeStartPositionHandler = (value: string) => {
    const newPoints = { ...points };
    newPoints.start.query = value;
    setPoints(newPoints);
    debounceFnStart(value);
  };
  const locationSuggestionClickHandler = async (
    locationSuggestion: PhotonFeature,
    startOrDestination: string
  ) => {
    const newPoints = suggestionHelper(
      locationSuggestion,
      points,
      startOrDestination
    );
    setPoints(newPoints);
  };

  const startNavigationHandler = async () => {
    const data = await tripData.mutateAsync(tripPoints);
    actions.setTrip(data);
    router.push('/trip');
  };

  useEffect(() => {
    (async () => {
      const startPosition = {
        lat: currentLocation?.coords.latitude,
        lon: currentLocation?.coords.longitude,
      };
      const data = await reverseData.mutateAsync(startPosition);
      const newPoints = { ...points };
      newPoints.start.location = {
        lat: data.features[0].geometry.coordinates[1],
        lon: data.features[0].geometry.coordinates[0],
      };
      newPoints.start.query = `${reverseData.data?.features[0].properties.street} ${reverseData.data?.features[0].properties.housenumber}, ${reverseData.data?.features[0].properties.postcode} ${reverseData.data?.features[0].properties.city}, ${reverseData.data?.features[0].properties.country}`;
      setPoints(newPoints);
    })();
  }, []);

  if (tripData.isPending || reverseData.isPending) {
    return <ActivityIndicator />;
  }

  if (tripData.error) {
    return <Text>Error loading TripData, {tripData.error.message}</Text>;
  }

  if (reverseData.error) {
    return (
      <View>
        <Text>reverseData Error, {reverseData.error.message}</Text>
      </View>
    );
  }

  return (
    <View className="mb-4">
      <View>
        <StartPosition
          prefill={points.start.query}
          onStartPositionChange={inputChangeStartPositionHandler}
        />
        {points.start.suggestions &&
          points.start.suggestions.features.length > 0 && (
            <Suggestions
              suggestions={points.start.suggestions.features}
              onLocationSuggestionClick={(suggestion: PhotonFeature) =>
                locationSuggestionClickHandler(suggestion, 'start')
              }
              startOrDestination="start"
            />
          )}

        <Destination
          query={points.destination.query}
          onDestinationChange={inputChangeHandler}
        />
        {points.destination.suggestions &&
          points.destination.suggestions.features.length > 0 && (
            <Suggestions
              suggestions={points.destination.suggestions.features}
              onLocationSuggestionClick={(suggestion: PhotonFeature) =>
                locationSuggestionClickHandler(suggestion, 'destination')
              }
              startOrDestination="destination"
            />
          )}

        <Button
          disabled={
            points.start.location === undefined ||
            points.destination.location === undefined ||
            points.start.query === undefined ||
            points.destination.query === undefined ||
            points.start.query?.length < 2 ||
            points.destination.query?.length < 2
          }
          onPress={startNavigationHandler}
          buttonType="primary"
        >
          <Text>Route starten</Text>
        </Button>
      </View>
    </View>
  );
}
