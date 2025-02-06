import React from 'react';

import { ListItem } from '@/components/atoms/ListItem';
import { getPhotonKey } from '@/functions/getPhotonKey';
import { photonValue } from '@/functions/photonValue';
import { CreatePhotonFeatureDto } from '@/services/api-backend';

interface SuggestionProps {
  suggestions: CreatePhotonFeatureDto[];
  onLocationSuggestionClick: (newValue: CreatePhotonFeatureDto | null) => void;
}
export function Suggestions({
  suggestions,
  onLocationSuggestionClick,
}: SuggestionProps) {
  return (
    <>
      {suggestions.map((suggestion, index) => (
        <ListItem
          key={getPhotonKey(suggestion)}
          onPress={() => {
            onLocationSuggestionClick(suggestion);
          }}
          classes={index !== suggestions.length - 1 ? 'text-textColor' : ''}
        >
          {index + 1}. {photonValue(suggestion)}
        </ListItem>
      ))}
      {/* <Button */}
      {/*   onPress={() => cleanLastDestinations()} */}
      {/*   buttonType="primary" */}
      {/*   width="full" */}
      {/* > */}
      {/*   Löschen */}
      {/* </Button> */}
    </>
  );
}
