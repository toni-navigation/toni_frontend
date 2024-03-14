import React from 'react';
import { ScrollView } from 'react-native';
import { PhotonFeature } from 'src/services/api-photon';

import { ListItem } from '@/components/atoms/ListItem';

interface SuggestionProps {
  suggestions: PhotonFeature[];
  onLocationSuggestionClick: (
    locationSuggestion: PhotonFeature
  ) => Promise<void>;
  startOrDestination: 'start' | 'destination';
}
export function Suggestions({
  suggestions,
  onLocationSuggestionClick,
  startOrDestination,
}: SuggestionProps) {
  return (
    <ScrollView
      className="mx-2 -mt-2 mb-4 border-solid border-2 p-4 rounded-[25px] border-black"
      accessibilityLabel={`Liste der Vorschläge für ${startOrDestination === 'start' ? 'Start' : 'Ziel'}`}
      accessibilityRole="list"
    >
      {suggestions.map((suggestion, index) => (
        <ListItem
          key={suggestion.properties.osm_type + suggestion.properties.osm_id}
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
