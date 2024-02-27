import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { PhotonFeature } from '../../../types/api-photon';

interface SuggestionProps {
  suggestions: PhotonFeature[];
  onLocationSuggestionClick: (
    locationSuggestion: PhotonFeature
  ) => Promise<void>;
  startOrDestination: 'start' | 'destination';
}
function Suggestions({
  suggestions,
  onLocationSuggestionClick,
  startOrDestination,
}: SuggestionProps) {
  const createKey = (suggestion: PhotonFeature) => {
    if (suggestion.properties.osm_type && suggestion.properties.osm_id) {
      return (
        suggestion.properties.osm_type +
        suggestion.properties.osm_id +
        startOrDestination
      );
    }
    return suggestion.properties.name + startOrDestination;
  };

  return (
    <View className="bg-gray-200 border-1">
      {suggestions.map((locationSuggestion) => (
        <View
          key={createKey(locationSuggestion)}
          className="flex justify-center font-bold border-b-1 border-b-gray-100"
        >
          <TouchableOpacity
            onPress={(): Promise<void> =>
              onLocationSuggestionClick(locationSuggestion)
            }
            className="flex justify-center font-bold py-2 px-4"
          >
            <Text>
              {locationSuggestion.properties.city},{' '}
              {locationSuggestion.properties.country},{' '}
              {locationSuggestion.properties.postcode}{' '}
              {locationSuggestion.properties.name}
            </Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
}

export default Suggestions;
