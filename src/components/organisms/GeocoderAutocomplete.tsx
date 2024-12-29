import { useDebounce } from '@uidotdev/usehooks';
import React, { useEffect, useRef, useState } from 'react';
import { ScrollView, TextInput, View } from 'react-native';

import { InputText } from '@/components/atoms/InputText';
import { Suggestions } from '@/components/organisms/Suggestions';
import { photonValue } from '@/functions/photonValue';
import { useGeocoding } from '@/queries/useGeocoding';
import { CreatePhotonFeatureDto } from '@/services/api-backend';

type GeocoderAutocompleteProps = {
  value?: CreatePhotonFeatureDto | undefined | null;
  label?: string;
  placeholder: string;
  onChange: (newValue: CreatePhotonFeatureDto | undefined | null) => void;
  extraSuggestions: boolean;
};

export function GeocoderAutocomplete({
  extraSuggestions,
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
    let newValue = '';
    if (value) {
      newValue = photonValue(value);
    } else if (value === null) {
      newValue = 'Mein Standort';
    }
    setInputValue(newValue);
  }, [value]);

  return (
    <View>
      <View>
        <InputText
          accessibilityHint={label}
          ref={ref}
          value={inputValue}
          accessibilityLabel={label}
          placeholder={placeholder}
          onClickDelete={() => {
            setInputValue('');
            ref.current?.focus();
            onChange(undefined);
          }}
          onChange={(event) => focused && setInputValue(event.nativeEvent.text)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
      </View>
      <ScrollView>
        {data && data.features.length >= 0 && (
          <Suggestions
            extraSuggestions={extraSuggestions}
            suggestions={data.features}
            onLocationSuggestionClick={(
              suggestion: CreatePhotonFeatureDto | null
            ) => {
              setFocused(false);
              onChange(suggestion);
              ref.current?.blur();
            }}
          />
        )}
      </ScrollView>
    </View>
  );
}
