import React from 'react';
import { ScrollView } from 'react-native';
import { PhotonFeature } from 'src/services/api-photon';

import { ListItem } from '@/components/atoms/ListItem';
import { photonValue } from '@/functions/photonValue';

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
      accessibilityHint="Liste der Vorschläge"
      keyboardShouldPersistTaps="always"
      className="-mt-10 mb-4 border-solid border-x-2 border-b-2 p-4 rounded-b-[25px] border-primary-color-dark"
      accessibilityLabel="Liste der Vorschläge"
      accessibilityRole="list"
    >
      {suggestions.map((suggestion, index) => (
        <ListItem
          key={`${suggestion.properties.osm_id}-${suggestion.properties.osm_type}-${suggestion.properties.osm_key}`}
          onPress={() => {
            console.log('suggestion', suggestion);
            onLocationSuggestionClick(suggestion);
          }}
          classes={
            index !== suggestions.length - 1
              ? 'border-solid border-b-2 border-primary-color-dark'
              : ''
          }
        >
          {index + 1}. {photonValue(suggestion)}
        </ListItem>
      ))}
    </ScrollView>
  );
}
