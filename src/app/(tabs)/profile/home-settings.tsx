import { useMutation, useQueryClient } from '@tanstack/react-query';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';

import { Button } from '@/components/atoms/Button';
import { ToniProfilePicture } from '@/components/atoms/icons/ToniProfilePicture';
import { ModalWrapper } from '@/components/favorite/ModalWrapper';
import { GeocoderAutocomplete } from '@/components/organisms/GeocoderAutocomplete';
import { getCurrentPosition } from '@/functions/getCurrentPosition';
import { useReverseData } from '@/mutations/useReverseData';
import { QUERY_KEYS } from '@/query-keys';
import {
  CreatePhotonFeatureDto,
  Favorite,
  UpdateFavoriteDto,
} from '@/services/api-backend';
import {
  favoritesControllerCreateFavoriteMutation,
  favoritesControllerUpdateFavoriteMutation,
} from '@/services/api-backend/@tanstack/react-query.gen';

type ParamsProps = {
  userId: string | undefined;

  homeFavorite: string | undefined;
};

export default function GeneralSettings() {
  const queryClient = useQueryClient();
  const reverseData = useReverseData();
  const params = useLocalSearchParams() as ParamsProps;
  const initialFavorite = params.homeFavorite
    ? (JSON.parse(params.homeFavorite) as Favorite)
    : undefined;

  const [home, setHome] = useState<UpdateFavoriteDto | undefined>(
    initialFavorite
  );
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const { mutate: updateFavoriteHome, isPending: isPendingFavorite } =
    useMutation({
      ...favoritesControllerUpdateFavoriteMutation(),
      onSuccess: async () => {
        await queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.home_address],
        });
        router.back();
      },
    });

  const { mutate: createFavoriteHome, isPending: isPendingCreate } =
    useMutation({
      ...favoritesControllerCreateFavoriteMutation(),
      onSuccess: async () => {
        await queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.home_address],
        });
        router.back();
      },
    });

  const saveSettings = () => {
    const oldAddress = initialFavorite?.photonFeature?.geometry.coordinates;
    const newAddress = home?.photonFeature?.geometry.coordinates;

    if (
      JSON.stringify(oldAddress) !== JSON.stringify(newAddress) &&
      home?.photonFeature &&
      home?.isPinned !== undefined &&
      home?.destinationType !== undefined &&
      home?.title !== undefined
    ) {
      if (initialFavorite) {
        updateFavoriteHome({
          body: {
            destinationType: home.destinationType,
            isPinned: home.isPinned,
            photonFeature: home.photonFeature,
            title: home.title,
          },
          path: { favoriteId: initialFavorite.id },
        });
      } else {
        createFavoriteHome({
          body: {
            title: home.title,
            destinationType: home.destinationType,
            isPinned: home.isPinned,
            photonFeature: home.photonFeature,
          },
        });
      }
    }
  };

  const addLocation = async (
    location: CreatePhotonFeatureDto | undefined | null
  ) => {
    if (location === null) {
      setIsLoadingLocation(true);
      const position = await getCurrentPosition();
      if (position) {
        const data = await reverseData.mutateAsync({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
        setHome((prevState) => ({
          ...prevState,
          title: 'Heimatadresse',
          destinationType: 'home',
          isPinned: true,
          photonFeature: data.features[0],
        }));
        setIsLoadingLocation(false);

        return;
      }
    }

    setHome((prevState) => ({
      ...prevState,
      title: 'Heimatadresse',
      destinationType: 'home',
      isPinned: true,
      photonFeature: location || undefined,
    }));
  };

  return (
    <ModalWrapper title="Persönliche Daten bearbeiten">
      <View className="px-8 py-5 items-center">
        <ToniProfilePicture height={70} width={70} />
      </View>
      <ScrollView>
        <GeocoderAutocomplete
          label="Heimatadresse"
          isLoading={isLoadingLocation}
          value={home?.photonFeature}
          placeholder="Heimatadresse eingeben"
          onChange={(photonFeature) => addLocation(photonFeature)}
        />
      </ScrollView>
      <View className="flex flex-row mb-8 gap-1.5">
        <Button
          width="half"
          onPress={() => router.back()}
          buttonType="primaryOutline"
        >
          Abbrechen
        </Button>
        <Button
          width="half"
          onPress={saveSettings}
          buttonType="accent"
          disabled={isPendingFavorite || isPendingCreate}
          isLoading={isPendingFavorite || isPendingCreate}
        >
          Speichern
        </Button>
      </View>
    </ModalWrapper>
  );
}
