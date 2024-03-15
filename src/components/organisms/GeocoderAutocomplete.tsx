import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useDebounce } from '@uidotdev/usehooks';
import React, { useEffect, useRef, useState } from 'react';
import { TextInput } from 'react-native';

import { InputText } from '@/components/atoms/InputText';
import { Suggestions } from '@/components/organisms/Suggestions';
import { photonValue } from '@/functions/functions';
import { PhotonFeature, PhotonService } from '@/services/api-photon';

type GeocoderAutocompleteProps = {
  value?: PhotonFeature;
  label: string;
  placeholder: string;
  onChange: (newValue: PhotonFeature) => void;
};

export function GeocoderAutocomplete({
  label,
  placeholder,
  value,
  onChange,
}: GeocoderAutocompleteProps) {
  const ref = useRef<TextInput>(null);
  const [inputValue, setInputValue] = useState('');
  const [focused, setFocused] = useState(false);
  const debouncedInputValue = useDebounce(inputValue, 500);

  const parameters: Parameters<typeof PhotonService.geocoding>[0] = {
    q: debouncedInputValue,
    limit: 5,
    lang: 'de',
  };
  const { data } = useQuery({
    queryKey: ['photon', parameters],
    queryFn: () => PhotonService.geocoding(parameters),
    enabled: focused,
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    if (value) {
      setInputValue(photonValue(value));
    }
  }, [value]);

  return (
    <>
      <InputText
        ref={ref}
        value={inputValue}
        accessibilityLabel={label}
        placeholder={placeholder}
        onChange={(event) => setInputValue(event.nativeEvent.text)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
      {data && data.features.length > 0 && (
        <Suggestions
          suggestions={data.features}
          onLocationSuggestionClick={(suggestion: PhotonFeature) => {
            onChange(suggestion);
            ref.current?.blur();
          }}
          startOrDestination="start"
        />
      )}
    </>
  );
}
