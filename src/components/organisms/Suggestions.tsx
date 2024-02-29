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
  const createKey = (suggestion: PhotonFeature, index: number) => {
    if (suggestion.properties.osm_type && suggestion.properties.osm_id) {
      return (
        suggestion.properties.osm_type +
        suggestion.properties.osm_id +
        index +
        startOrDestination
      );
    }
    return index + startOrDestination;
  };

  return (
    <ScrollView className="mx-2 -mt-2 mb-4 border-solid border-2 p-4 rounded-[25px] border-black">
      {suggestions.map((suggestion, index) => (
        <TouchableOpacity
          key={createKey(suggestion, index)}
          onPress={(): Promise<void> => onLocationSuggestionClick(suggestion)}
          className="
            border-b-[1px] py-3 px-2 last:border-none"
        >
          <Text>{`${suggestion.properties.name}, ${suggestion.properties.postcode} ${suggestion.properties.city}, ${suggestion.properties.country}`}</Text>
        </TouchableOpacity>
        // <ListItem
        //   value={`${suggestion.properties.name}, ${suggestion.properties.postcode} ${suggestion.properties.city}, ${suggestion.properties.country}`}
        //   index={index}
        //   touchable={true}
        //   onPress={(): Promise<void> => onLocationSuggestionClick(suggestion)}
        // ></ListItem>
      ))}
    </ScrollView>
  );
}

export default Suggestions;
