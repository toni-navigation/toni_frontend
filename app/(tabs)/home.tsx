import React, { useCallback } from 'react';
import { router } from 'expo-router';
import { Text, View } from 'react-native';
import { debounce } from 'lodash';
import Button from '../../src/components/atoms/Button';
import { fetchReverseDataHandler } from '../../src/functions/fetch';
import { suggestionHelper } from '../../src/functions/functions';
import Destination from '../../src/pages/Destination';
import Suggestions from '../../src/components/organisms/Suggestions';
import { PhotonFeature } from '../../types/api-photon';
import useUserStore from '../../store/useUserStore';
import { useReverseData, useSearchData } from '../../src/functions/mutations';

export default function Home() {
  const { points, actions } = useUserStore();

  // const searchLocationData = useSearchData(points.destination.query);

  const searchData = useSearchData();
  const reverseData = useReverseData();

  const suggestionsHandler = async (query: string) => {
    searchData.mutate(query);
    console.log(searchData);
    if (searchData.data) {
      actions.setSuggestions(searchData.data);
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceFn = useCallback(debounce(suggestionsHandler, 500), []);

  const inputChangeHandler = (value: string) => {
    actions.setDestinationQuery(value);
    debounceFn(value);
  };
  const locationSuggestionClickHandler = async (
    locationSuggestion: PhotonFeature
  ) => {
    const newPoints = suggestionHelper(locationSuggestion, points);
    actions.setTripData(newPoints);
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
          {searchData.error && <Text>Error loading SearchData</Text>}
          {reverseData.error && <Text>Error loading SearchData</Text>}
          <Text>Route starten</Text>
        </Button>
      </View>
    </View>
  );
}
