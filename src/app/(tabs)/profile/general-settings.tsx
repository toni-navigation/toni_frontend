import { useMutation, useQueryClient } from '@tanstack/react-query';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';

import { Button } from '@/components/atoms/Button';
import { InputText } from '@/components/atoms/InputText';
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
  UpdateUserDto,
} from '@/services/api-backend';
import {
  favoritesControllerCreateFavoriteMutation,
  favoritesControllerUpdateFavoriteMutation,
  usersControllerUpdateUserMutation,
} from '@/services/api-backend/@tanstack/react-query.gen';

type ParamsProps = {
  userId: string | undefined;
  firstname: string | undefined;
  lastname: string | undefined;
  homeFavorite: string | undefined;
};

export default function GeneralSettings() {
  const queryClient = useQueryClient();
  const reverseData = useReverseData();

  const params = useLocalSearchParams() as ParamsProps;
  const initialFavorite = params.homeFavorite
    ? (JSON.parse(params.homeFavorite) as Favorite)
    : undefined;

  const [firstname, setFirstname] = useState(params?.firstname ?? '');
  const [lastname, setLastname] = useState(params?.lastname ?? '');
  const [home, setHome] = useState<UpdateFavoriteDto | undefined>(
    initialFavorite
  );

  const { mutate: updateUser, isPending: isPendingUser } = useMutation({
    ...usersControllerUpdateUserMutation(),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.user] });
      router.back();
    },
  });

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
    const userUpdates: UpdateUserDto = {};

    if (firstname !== params.firstname) {
      userUpdates.firstname = firstname;
    }
    if (lastname !== params.lastname) {
      userUpdates.lastname = lastname;
    }

    if (params.userId && Object.keys(userUpdates).length > 0) {
      updateUser({
        body: userUpdates,
        path: { userId: params.userId },
      });
    }

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
        <InputText
          placeholder="Vorname eingeben"
          accessibilityLabel="Vorname"
          accessibilityHint="Vorname eingeben"
          value={firstname}
          onChange={(event) => setFirstname(event.nativeEvent.text)}
        />
        <InputText
          placeholder="Nachname eingeben"
          accessibilityLabel="Nachname"
          accessibilityHint="Nachname eingeben"
          value={lastname}
          onChange={(event) => setLastname(event.nativeEvent.text)}
        />
        <GeocoderAutocomplete
          label="Heimatadresse"
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
          disabled={isPendingFavorite || isPendingUser || isPendingCreate}
          isLoading={isPendingFavorite || isPendingUser || isPendingCreate}
        >
          Speichern
        </Button>
      </View>
    </ModalWrapper>
  );
}
