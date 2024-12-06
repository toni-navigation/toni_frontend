import { useDebounce } from '@uidotdev/usehooks';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ScrollView, TextInput, View } from 'react-native';

import { InputText } from '@/components/atoms/InputText';
import { Suggestions } from '@/components/organisms/Suggestions';
import { photonValue } from '@/functions/photonValue';
import { useReverseData } from '@/mutations/useReverseData';
import { useGeocoding } from '@/queries/useGeocoding';
import { PhotonFeature, PhotonFeatureCollection } from '@/services/api-photon';
import { useCurrentLocationStore } from '@/store/useCurrentLocationStore';

type GeocoderAutocompleteProps = {
  value?: PhotonFeature | undefined | null;
  label?: string;
  placeholder: string;
  onChange: (newValue: PhotonFeature | undefined) => void;
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
  const currentLocation = useCurrentLocationStore(
    (state) => state.currentLocation
  );

  const reverseLocation = useReverseData();
  const [currentLocationData, setCurrentLocationData] = useState<
    PhotonFeatureCollection | undefined
  >(undefined);

  const createCurrentLocation = useCallback(async () => {
    if (currentLocation) {
      const data = await reverseLocation.mutateAsync({
        lat: currentLocation.coords.latitude,
        lon: currentLocation.coords.longitude,
      });
      setCurrentLocationData(data);
    }
  }, [currentLocation, reverseLocation]);

  const hasCalledCreateCurrentLocation = useRef(false);

  useEffect(() => {
    if (!hasCalledCreateCurrentLocation.current) {
      createCurrentLocation();
      hasCalledCreateCurrentLocation.current = true;
    }
  }, [createCurrentLocation]);

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
          autoFocus
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
            currentLocation={currentLocationData?.features[0]}
            suggestions={data.features}
            onLocationSuggestionClick={(suggestion: PhotonFeature) => {
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
