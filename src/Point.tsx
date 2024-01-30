import React from 'react';
import Suggestions from './Suggestions';
import { FeatureProps, SearchProps } from '../types/Nominatim-Types';

interface PointProps {
  point: SearchProps;
  onInputChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => void;
  index: number;
  onLocationSuggestionClick: (
    locationSuggestion: FeatureProps,
    index: number
  ) => Promise<void>;
}
function Point(props: PointProps) {
  const { point, onInputChange, index, onLocationSuggestionClick } = props;
  return (
    <div>
      <input value={point.query} onChange={(e) => onInputChange(e, index)} />
      {point.suggestions && point.suggestions.length > 0 && (
        <Suggestions
          suggestions={point.suggestions}
          index={index}
          onLocationSuggestionClick={onLocationSuggestionClick}
        />
      )}
    </div>
  );
}

export default Point;
