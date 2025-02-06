import { useDebounce } from '@uidotdev/usehooks';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { ActivityIndicator, ScrollView, TextInput, View } from 'react-native';

import { themes } from '@/colors';
import { ThemeContext } from '@/components/ThemeProvider';
import { Destination } from '@/components/atoms/Destination';
import { Header } from '@/components/atoms/Header';
import { InputText } from '@/components/atoms/InputText';
import { ListItem } from '@/components/atoms/ListItem';
import { ToniLocation } from '@/components/atoms/icons/ToniLocation';
import { Suggestions } from '@/components/organisms/Suggestions';
import { getPhotonKey } from '@/functions/getPhotonKey';
import { photonValue } from '@/functions/photonValue';
import { useGeocoding } from '@/queries/useGeocoding';
import { CreatePhotonFeatureDto } from '@/services/api-backend';
import { useTripStore } from '@/store/useTripStore';

type GeocoderAutocompleteProps = {
  value?: CreatePhotonFeatureDto | undefined | null;
  label?: string;
  placeholder: string;
  className?: string;
  onChange: (newValue: CreatePhotonFeatureDto | undefined | null) => void;
  isLoading?: boolean;
};

export function GeocoderAutocomplete({
  label,
  placeholder,
  value,
  onChange,
  isLoading,
  className,
}: GeocoderAutocompleteProps) {
  const { theme } = useContext(ThemeContext);
  const lastDestinations = useTripStore((state) => state.lastDestinations);

  const ref = useRef<TextInput>(null);
  const [inputValue, setInputValue] = useState('');
  const [focused, setFocused] = useState(false);
  const debouncedInputValue = useDebounce(inputValue, 500);
  const {
    data,
    isPending: isPendingGeocoding,
    isLoading: isLoadingGeocoding,
  } = useGeocoding(
    debouncedInputValue,
    focused && debouncedInputValue.length > 0
  );
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
      <InputText
        accessibilityHint={label}
        ref={ref}
        value={inputValue}
        className={className}
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
      <ScrollView>
        {isLoading && (
          <ActivityIndicator
            size="large"
            color={themes.external[`--${theme}-mode-icon-button`]}
          />
        )}
        <View
          accessibilityHint="Liste der Vorschläge"
          className="bg-invertedPrimary p-4 rounded-[25px] text-textColor"
          accessibilityLabel="Liste der Vorschläge"
          accessibilityRole="list"
        >
          <View className="flex flex-row items-center">
            <ToniLocation
              width={22}
              height={22}
              fillInner="none"
              fillOuter="none"
              stroke={themes.external[`--${theme}-mode-primary`]}
              strokeWidth={4}
            />
            <ListItem
              classes="flex-1 text-textColor"
              onPress={() => {
                setFocused(false);
                onChange(null);
                ref.current?.blur();
              }}
            >
              Mein Standort
            </ListItem>
          </View>
          {isPendingGeocoding && isLoadingGeocoding && (
            <ActivityIndicator
              size="large"
              color={themes.external[`--${theme}-mode-icon-button`]}
            />
          )}
          {data && data.features.length === 0 && debouncedInputValue && (
            <ListItem classes="text-textColor">
              Keine Ergebnisse gefunden
            </ListItem>
          )}
          {data && data.features.length >= 0 && (
            <Suggestions
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
          {lastDestinations.length > 0 && (
            <View>
              <Header classes="text-xl mt-12">Letzte Ziele</Header>
              <View>
                {lastDestinations.map((destination) => (
                  <Destination
                    key={getPhotonKey(destination)}
                    onPress={() => {
                      onChange(destination);
                    }}
                  >
                    {photonValue(destination)}
                  </Destination>
                ))}
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}
