import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { FeatureProps } from '../../types/Photon-Types';

interface SuggestionProps {
  suggestions: FeatureProps[];
  onLocationSuggestionClick: (
    locationSuggestion: FeatureProps
  ) => Promise<void>;
}
function Suggestions(props: SuggestionProps) {
  const { suggestions, onLocationSuggestionClick } = props;
  return (
    <View className="bg-gray-200 border-1">
      {suggestions.map((locationSuggestion) => (
        <View
          key={
            locationSuggestion.properties.osm_type +
            locationSuggestion.properties.osm_id
          }
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
              {locationSuggestion.properties.countrycode}{' '}
              {locationSuggestion.properties.name}
            </Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
}

export default Suggestions;
