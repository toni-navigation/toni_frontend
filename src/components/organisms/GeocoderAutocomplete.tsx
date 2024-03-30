import { useDebounce } from '@uidotdev/usehooks';
import React, { useEffect, useRef, useState } from 'react';
import { TextInput } from 'react-native';

import { InputText } from '@/components/atoms/InputText';
import { Suggestions } from '@/components/organisms/Suggestions';
import { getBbox } from '@/functions/getCircle';
import { photonValue } from '@/functions/photonValue';
import { useGeocoding } from '@/queries/useGeocoding';
import { PhotonFeature } from '@/services/api-photon';
import { useCurrentLocationStore } from '@/store/useCurrentLocationStore';

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
  const currentLocation = useCurrentLocationStore(
    (state) => state.currentLocation
  );
  const ref = useRef<TextInput>(null);
  const [inputValue, setInputValue] = useState('');
  const [focused, setFocused] = useState(false);
  const debouncedInputValue = useDebounce(inputValue, 500);

  const bbox = getBbox(currentLocation);
  const { data, error } = useGeocoding(
    debouncedInputValue,
    focused,
    bbox?.coords
  );

  useEffect(() => {
    if (value) {
      setInputValue(photonValue(value));
    }
  }, [value]);
  console.log(error);

  return (
    <>
      <InputText
        ref={ref}
        value={inputValue}
        accessibilityLabel={label}
        placeholder={placeholder}
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
