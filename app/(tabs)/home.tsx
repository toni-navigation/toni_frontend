import React, { useCallback, useEffect, useState } from 'react';
import { router } from 'expo-router';
import { SafeAreaView, ScrollView, Text, useColorScheme } from 'react-native';
import { debounce } from 'lodash';
import Button from '../../src/components/atoms/Button';
import { suggestionHelper } from '../../src/functions/functions';
import Destination from '../../src/pages/Destination';
import Suggestions from '../../src/components/organisms/Suggestions';
import { PhotonFeature } from '../../types/api-photon';
import useUserStore from '../../store/useUserStore';
import { useSearchData } from '../../src/functions/mutations';

export default function Home() {
  const { points, actions } = useUserStore();
  const searchData = useSearchData();
  const colorscheme = useColorScheme();

  const suggestionsHandler = async (query: string) => {
    const data = await searchData.mutateAsync(query);
    actions.setSuggestions(data);
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
    <SafeAreaView
      className={`flex-1 ${colorscheme === 'light' ? 'bg-background-light' : 'bg-background-dark'}`}
    >
      <ScrollView className="mx-5">
        <Destination
          query={points.destination.query}
          onDestinationChange={inputChangeHandler}
        />
        {points.destination.suggestions &&
          points.destination.suggestions.features.length > 0 && (
            <Suggestions
              suggestions={points.destination.suggestions.features}
              onLocationSuggestionClick={locationSuggestionClickHandler}
            />
          )}
        {searchData.error && <Text>Error loading SearchData</Text>}
        {searchData.isPending && <Text>loading SearchData</Text>}
        {searchData.isIdle && <Text>SearchData isIdle</Text>}
        <Button
          onPress={() => router.push('/trip')}
          disabled={!points.destination.location}
          buttonType="primary"
        >
          <Text>Route starten</Text>
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
}
