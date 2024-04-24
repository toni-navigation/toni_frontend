import { useDebounce } from '@uidotdev/usehooks';
import React, { useEffect, useRef, useState } from 'react';
import { TextInput } from 'react-native';

import { InputText } from '@/components/atoms/InputText';
import { Suggestions } from '@/components/organisms/Suggestions';
import { photonValue } from '@/functions/photonValue';
import { useGeocoding } from '@/queries/useGeocoding';
import { PhotonFeature } from '@/services/api-photon';
import { OriginDestinationType } from '@/store/useTripStore';

type GeocoderAutocompleteProps = {
  value?: OriginDestinationType;
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

  const { data } = useGeocoding(debouncedInputValue, focused);

  useEffect(() => {
    if (value) {
      setInputValue(photonValue(value));
    }
    if (value === null) {
      setInputValue('Mein Standort');
    }
  }, [value]);

  return (
    <>
      <InputText
        accessibilityHint={label}
        ref={ref}
        value={inputValue}
        accessibilityLabel={label}
        placeholder={placeholder}
        onClickDelete={() => setInputValue('')}
        onChange={(event) => focused && setInputValue(event.nativeEvent.text)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
      {data && data.features.length > 0 && focused && (
        <Suggestions
          suggestions={data.features}
          onLocationSuggestionClick={(suggestion: PhotonFeature) => {
            setFocused(false);
            onChange(suggestion);
            ref.current?.blur();
          }}
        />
      )}
    </>
  );
}
