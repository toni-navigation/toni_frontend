import { router } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';

import { themes } from '@/colors';
import { Button } from '@/components/atoms/Button';
import { ToniLocation } from '@/components/atoms/icons/ToniLocation';
import { photonValue } from '@/functions/photonValue';
import { Favorite } from '@/services/api-backend';
import { useCurrentLocationStore } from '@/store/useCurrentLocationStore';
import { useFavoriteStore } from '@/store/useFavoriteStore';

interface FavoritesCardProps {
  favorite: Favorite;
}

export function FavoritesCard({ favorite }: FavoritesCardProps) {
  const { addFavorite } = useFavoriteStore((state) => state.actions);
  const currentLocation = useCurrentLocationStore(
    (state) => state.currentLocation
  );

  const startTrip = () => {
    if (!currentLocation) {
      console.error('No current location available');

      return;
    }
    const newOrigin = [
      currentLocation.coords.longitude,
      currentLocation.coords.latitude,
    ];
    const newDestination = favorite.photonFeature.geometry.coordinates;

    if (newOrigin && newDestination) {
      const params = {
        origin: newOrigin,
        destination: newDestination,
      };
      router.push({ pathname: `/trip`, params });
    }
  };

  return (
    <View className="rounded-[25px] mb-5 py-3 px-6 bg-white shadow-md">
      <Text className="font-generalSansSemi text-2xl text-primary">
        {favorite.title}
      </Text>

      <View className="flex flex-row items-center justify-between mb-6 gap-2">
        <View className="w-3/4">
          <Text className="mb-5 mt-5 font-light text-s">Adresse</Text>
          <Text className="">{photonValue(favorite.photonFeature)}</Text>
        </View>
        {favorite.isPinned && (
          <ToniLocation
            fillOuter={themes.external[`--accent`]}
            stroke={themes.external[`--accent`]}
            fillInner={themes.external[`--accent`]}
            width={36}
            height={36}
          />
        )}
      </View>

      <View className="flex flex-row gap-2">
        <Button
          onPress={() => {
            addFavorite(favorite);
            router.push({
              pathname: '/favorites/[id]',
              params: {
                id: favorite.id,
              },
            });
          }}
          buttonType="primaryOutline"
          width="half"
        >
          Bearbeiten
        </Button>
        <Button
          disabled={!currentLocation}
          onPress={startTrip}
          buttonType="accent"
          width="half"
        >
          Start
        </Button>
      </View>
    </View>
  );
}
