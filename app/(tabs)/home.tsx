import React, { useCallback, useState } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { debounce } from 'lodash';
import { router } from 'expo-router';
import Button from '../../src/components/atoms/Button';
import { suggestionHelper } from '../../src/functions/functions';
import Destination from '../../src/pages/Destination';
import Suggestions from '../../src/components/organisms/Suggestions';
import { PhotonFeature } from '../../types/api-photon';
import useUserStore from '../../store/useUserStore';
import { useSearchData, useTrip } from '../../src/functions/mutations';
import { LocationProps, PointsProps } from '../../types/Types';
import { ValhallaProps } from '../../types/Valhalla-Types';

const INITIAL_POINTS: PointsProps = {
  start: {},
  destination: {
    query: '',
  },
};
export default function Home() {
  const [points, setPoints] = useState<PointsProps>(INITIAL_POINTS);
  const { actions, currentLocation } = useUserStore();
  const { destination } = points;
  const start = {
    lat: currentLocation?.coords.latitude,
    lon: currentLocation?.coords.longitude,
  };
  const tripPoints: (LocationProps | undefined | null)[] = [
    start,
    destination.location,
  ];
  const searchData = useSearchData(currentLocation);
  const tripData = useTrip();

  const suggestionsHandler = async (query: string) => {
    const data = await searchData.mutateAsync(query);
    const newPoints = { ...points };
    newPoints.destination.suggestions = data;
    setPoints(newPoints);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceFn = useCallback(debounce(suggestionsHandler, 500), []);

  const inputChangeHandler = (value: string) => {
    const newPoints = { ...points };
    newPoints.destination.query = value;
    setPoints(newPoints);
    debounceFn(value);
  };
  const locationSuggestionClickHandler = async (
    locationSuggestion: PhotonFeature
  ) => {
    const newPoints = suggestionHelper(locationSuggestion, points);
    setPoints(newPoints);
  };

  const startNavigationHandler = async () => {
    const data = await tripData.mutateAsync(tripPoints);
    actions.setTrip(data);
    router.push('/trip');
  };

  if (tripData.isPending) {
    return <ActivityIndicator />;
  }

  if (tripData.error) {
    return <Text>Error loading TripData, {tripData.error.message}</Text>;
  }

  return (
    <View className="mb-4">
      <View>
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
          onPress={startNavigationHandler}
          disabled={!points.destination.location}
          buttonType="primary"
        >
          <Text>Route starten</Text>
        </Button>
      </View>
    </View>
  );
}
