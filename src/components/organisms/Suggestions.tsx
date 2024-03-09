import React from 'react';
import {
  FlatList,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { PhotonFeature } from '../../../types/api-photon';
import ListItem from '../atoms/ListItem';

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
    return startOrDestination;
  };

  return (
    <ScrollView
      className="mx-2 -mt-2 mb-4 border-solid border-2 p-4 rounded-[25px] border-black"
      accessibilityLabel={`Liste der Vorschläge für ${startOrDestination === 'start' ? 'Start' : 'Ziel'}`}
      accessibilityRole="list"
    >
      {suggestions.map((suggestion, index) => (
        <ListItem
          key={createKey(suggestion)}
          onPress={(): Promise<void> => onLocationSuggestionClick(suggestion)}
        >
          {index + 1}. {suggestion.properties.name},
          {suggestion.properties.postcode} {suggestion.properties.city},
          {suggestion.properties.country}
        </ListItem>
      ))}
    </ScrollView>
  );
}

export default Suggestions;
