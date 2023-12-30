import React from 'react';
import { FeatureProps, SuggestionsProps } from '../types/Nominatim-Types';

interface SuggestionProps {
  suggestions: SuggestionsProps;
  onLocationSuggestionClick: (
    locationSuggestion: FeatureProps,
    index: number
  ) => Promise<void>;
  index: number;
}
function Suggestions(props: SuggestionProps) {
  const { suggestions, onLocationSuggestionClick, index } = props;
  return (
    <ul>
      {suggestions.map((locationSuggestion) => (
        <li
          key={
            locationSuggestion.properties.geocoding.osm_type +
            locationSuggestion.properties.geocoding.osm_id
          }
        >
          <button
            type="button"
            onClick={(): Promise<void> =>
              onLocationSuggestionClick(locationSuggestion, index)
            }
          >
            {locationSuggestion.properties.geocoding.label}
          </button>
        </li>
      ))}
    </ul>
  );
}

export default Suggestions;
