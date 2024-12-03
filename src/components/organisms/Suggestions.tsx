import React, { useContext } from 'react';
import { Text, View } from 'react-native';
import { PhotonFeature } from 'src/services/api-photon';

import { themes } from '@/colors';
import { ThemeContext } from '@/components/ThemeProvider';
import { Destination } from '@/components/atoms/Destination';
import { Header } from '@/components/atoms/Header';
import { ListItem } from '@/components/atoms/ListItem';
import { ToniLocation } from '@/components/atoms/icons/ToniLocation';
import { getPhotonKey } from '@/functions/getPhotonKey';
import { photonValue } from '@/functions/photonValue';
import { useTripStore } from '@/store/useTripStore';

interface SuggestionProps {
  suggestions: PhotonFeature[];
  onLocationSuggestionClick: (newValue: PhotonFeature) => void;
  currentLocation: PhotonFeature | undefined;
}
export function Suggestions({
  suggestions,
  onLocationSuggestionClick,
  currentLocation,
}: SuggestionProps) {
  const { theme } = useContext(ThemeContext);
  const lastDestinations = useTripStore((state) => state.lastDestinations);

  return (
    <View
      accessibilityHint="Liste der Vorschläge"
      className="bg-invertedPrimary p-4 rounded-[25px] text-textColor"
      accessibilityLabel="Liste der Vorschläge"
      accessibilityRole="list"
    >
      {currentLocation && (
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
            classes="flex-1"
            onPress={() => {
              onLocationSuggestionClick(currentLocation);
            }}
          >
            Mein Standort
          </ListItem>
        </View>
      )}
      {suggestions.map((suggestion, index) => (
        <ListItem
          key={getPhotonKey(suggestion)}
          onPress={() => {
            // addDestination(listItemKey, suggestion);
            onLocationSuggestionClick(suggestion);
          }}
          classes={index !== suggestions.length - 1 ? 'text-textColor' : ''}
        >
          {index + 1}. {photonValue(suggestion)}
        </ListItem>
      ))}
      <Header classes="text-xl mt-12">Letzte Ziele</Header>
      <View>
        {lastDestinations.length === 0 ? (
          <Text className="font-atkinsonRegular text-2xl text-textColor">
            keine Ziele vorhanden
          </Text>
        ) : (
          lastDestinations.map((destination) => (
            <Destination
              key={getPhotonKey(destination)}
              onPress={() => {
                onLocationSuggestionClick(destination);
              }}
            >
              {photonValue(destination)}
            </Destination>
          ))
        )}
      </View>
    </View>
  );
}
