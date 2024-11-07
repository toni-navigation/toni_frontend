import React, { useContext } from 'react';
import { Text, View } from 'react-native';
import { PhotonFeature } from 'src/services/api-photon';

import { themes } from '@/colors';
import { ThemeContext } from '@/components/ThemeProvider';
import { Destination } from '@/components/atoms/Destination';
import { Header } from '@/components/atoms/Header';
import { ListItem } from '@/components/atoms/ListItem';
import { Location } from '@/components/atoms/icons/Location';
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
          <Location
            width={18}
            height={18}
            fill={themes.external[`--${theme}-mode-icon-button`]}
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
