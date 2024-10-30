import { LocationObject } from 'expo-location';
import React from 'react';
import { Text } from 'react-native';

import { useReverseData } from '@/queries/useReverseData';

interface CurrentLocationProps {
  currentLocation: LocationObject;
}

export function CurrentLocation({ currentLocation }: CurrentLocationProps) {
  const reverseLocation = useReverseData(
    currentLocation.coords.latitude,
    currentLocation.coords.longitude
  );

  return (
    <Text className="px-2 text-accent font-generalSansSemi">
      {reverseLocation.data ? (
        <>
          {reverseLocation.data.features[0].properties.name && (
            <Text>{reverseLocation.data.features[0].properties.name}, </Text>
          )}

          {reverseLocation.data.features[0].properties.street && (
            <Text>{reverseLocation.data?.features[0].properties.street}</Text>
          )}

          <Text>
            {reverseLocation.data.features[0].properties.housenumber
              ? ` ${reverseLocation.data.features[0].properties.housenumber}, `
              : ', '}
          </Text>

          {reverseLocation.data.features[0].properties.postcode && (
            <Text>
              {reverseLocation.data?.features[0].properties.postcode}{' '}
            </Text>
          )}

          {reverseLocation.data.features[0].properties.city && (
            <Text>{reverseLocation.data?.features[0].properties.city}</Text>
          )}
        </>
      ) : (
        <Text>Mein Standort</Text>
      )}
    </Text>
  );
}
