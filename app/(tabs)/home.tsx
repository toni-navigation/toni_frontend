import React, { useCallback, useEffect } from 'react';
import { router } from 'expo-router';
import { Text, View } from 'react-native';
import { debounce } from 'lodash';
import Button from '../../src/components/atoms/Button';
import { suggestionHelper } from '../../src/functions/functions';
import Destination from '../../src/pages/Destination';
import Suggestions from '../../src/components/organisms/Suggestions';
import { PhotonFeature } from '../../types/api-photon';
import useUserStore from '../../store/useUserStore';
import { useReverseData, useSearchData } from '../../src/functions/mutations';
import StartPosition from '../../src/pages/StartPosition';

export default function Home() {
  const { points, actions, currentLocation } = useUserStore();
  const searchData = useSearchData();
  const reverseData = useReverseData();

  const suggestionsHandlerDestination = async (query: string) => {
    const data = await searchData.mutateAsync(query);
    actions.setSuggestionsDestination(data);
  };

  const debounceFnDestination = useCallback(
    debounce(suggestionsHandlerDestination, 500),
    []
  );

  const suggestionsHandlerStart = async (query: string) => {
    const data = await searchData.mutateAsync(query);
    actions.setSuggestionsStart(data);
  };

  const debounceFnStart = useCallback(
    debounce(suggestionsHandlerStart, 500),
    []
  );

  const inputChangeHandler = (value: string) => {
    actions.setDestinationQuery(value);
    debounceFnDestination(value);
  };

  const inputChangeStartPositionHandler = (value: string) => {
    actions.setStartPositionQuery(value);
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
    actions.setTripData(newPoints);
  };

  useEffect(() => {
    (async () => {
      const startPosition = {
        lat: currentLocation?.coords.latitude,
        lon: currentLocation?.coords.longitude,
      };
      const data = await reverseData.mutateAsync(startPosition);
      actions.setStartPosition(data);
    })();
  }, []);

  if (reverseData.error) {
    return (
      <View>
        <Text>Error</Text>
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
        {searchData.error && <Text>Error loading SearchData</Text>}
        {searchData.isPending && <Text>loading SearchData</Text>}
        {searchData.isIdle && <Text>SearchData isIdle</Text>}

        <Button
          onPress={() => router.push('/trip')}
          disabled={
            points.start.location === undefined ||
            points.destination.location === undefined ||
            points.start.query === undefined ||
            points.destination.query === undefined ||
            points.start.query?.length < 2 ||
            points.destination.query?.length < 2
          }
          buttonType="primary"
        >
          <Text>Route starten</Text>
        </Button>
      </View>
    </View>
  );
}
