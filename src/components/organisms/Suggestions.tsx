import React, { useContext } from 'react';
import { View } from 'react-native';

import { themes } from '@/colors';
import { ThemeContext } from '@/components/ThemeProvider';
import { Destination } from '@/components/atoms/Destination';
import { Header } from '@/components/atoms/Header';
import { ListItem } from '@/components/atoms/ListItem';
import { ToniLocation } from '@/components/atoms/icons/ToniLocation';
import { getPhotonKey } from '@/functions/getPhotonKey';
import { photonValue } from '@/functions/photonValue';
import { CreatePhotonFeatureDto } from '@/services/api-backend';
import { useTripStore } from '@/store/useTripStore';

interface SuggestionProps {
  suggestions: CreatePhotonFeatureDto[];
  onLocationSuggestionClick: (newValue: CreatePhotonFeatureDto | null) => void;
}
export function Suggestions({
  suggestions,
  onLocationSuggestionClick,
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
            onLocationSuggestionClick(null);
          }}
        >
          Mein Standort
        </ListItem>
      </View>
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
      {lastDestinations.length > 0 && (
        <View>
          <Header classes="text-xl mt-12">Letzte Ziele</Header>
          <View>
            {lastDestinations.map((destination) => (
              <Destination
                key={getPhotonKey(destination)}
                onPress={() => {
                  onLocationSuggestionClick(destination);
                }}
              >
                {photonValue(destination)}
              </Destination>
            ))}
          </View>
        </View>
      )}
    </View>
  );
}
