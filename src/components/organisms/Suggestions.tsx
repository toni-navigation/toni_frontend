import React from 'react';
import { ScrollView } from 'react-native';
import { PhotonFeature } from 'src/services/api-photon';

import { ListItem } from '@/components/atoms/ListItem';
import { photonValue } from '@/functions/functions';

interface SuggestionProps {
  suggestions: PhotonFeature[];
  onLocationSuggestionClick: (newValue: PhotonFeature) => void;
}
export function Suggestions({
  suggestions,
  onLocationSuggestionClick,
}: SuggestionProps) {
  return (
    <ScrollView
      keyboardShouldPersistTaps="always"
      className="mx-2 -mt-2 mb-4 border-solid border-2 p-4 rounded-[25px] border-black"
      accessibilityLabel="Liste der Vorschläge"
      accessibilityRole="list"
    >
      {suggestions.map((suggestion, index) => (
        <ListItem
          key={`${suggestion.properties.osm_id}-${suggestion.properties.osm_type}-${suggestion.properties.osm_key}`}
          onPress={() => onLocationSuggestionClick(suggestion)}
        >
          {index + 1}. {photonValue(suggestion)}
        </ListItem>
      ))}
    </ScrollView>
  );
}
