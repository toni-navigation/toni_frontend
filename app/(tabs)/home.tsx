import React, { useCallback } from 'react';
import { router } from 'expo-router';
import { Text, View } from 'react-native';
import { debounce } from 'lodash';
import Button from '../../src/components/atoms/Button';
import {
  fetchReverseDataHandler,
  fetchSearchDataHandler,
} from '../../src/functions/fetch';
import { suggestionHelper } from '../../src/functions/functions';
import Destination from '../../src/pages/Destination';
import Suggestions from '../../src/components/organisms/Suggestions';
import useCurrentLocationStore from '../../store/locationStore';
import usePointsStore from '../../store/pointsStore';
import { PhotonFeature } from '../../types/api-photon';

export default function Home() {
  const { currentLocation } = useCurrentLocationStore();
  const { points, setDestinationQuery, setSuggestions, setTripData } =
    usePointsStore();
  const suggestionsHandler = async (query: string) => {
    const searchLocationData = await fetchSearchDataHandler(query);
    if (searchLocationData) {
      setSuggestions(searchLocationData);
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceFn = useCallback(debounce(suggestionsHandler, 500), []);

  /* const callTrip = async (newPoints: PointsProps) => {
    const startAndDestination: LocationType[] = [
      newPoints.start.location,
      newPoints.destination.location,
    ];
    const newTrip = await fetchTripHandler(startAndDestination);
    setTrip(newTrip);
  };*/

  const inputChangeHandler = (value: string) => {
    setDestinationQuery(value);
    debounceFn(value);
  };
  const locationSuggestionClickHandler = async (
    locationSuggestion: PhotonFeature
  ) => {
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
        setTripData(newPoints);
      }
    }
  };

  return (
    <View className="mb-4">
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
        <Button
          onPress={() => router.push('/trip')}
          disabled={!points.destination.location || !points.start.location}
          buttonType="primary"
        >
          <Text>Route starten</Text>
        </Button>
      </View>
    </View>
  );
}
