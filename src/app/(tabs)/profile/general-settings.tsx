import { useMutation, useQueryClient } from '@tanstack/react-query';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { Alert, ScrollView, View } from 'react-native';

import { Button } from '@/components/atoms/Button';
import { InputText } from '@/components/atoms/InputText';
import { ToniProfilePicture } from '@/components/atoms/icons/ToniProfilePicture';
import { ModalWrapper } from '@/components/favorite/ModalWrapper';
import { GeocoderAutocomplete } from '@/components/organisms/GeocoderAutocomplete';
import { QUERY_KEYS } from '@/query-keys';
import {
  Favorite,
  UpdateFavoriteDto,
  UpdateUserDto,
} from '@/services/api-backend';
import {
  favoritesControllerCreateFavoriteMutation,
  favoritesControllerUpdateFavoriteMutation,
  usersControllerUpdateUserMutation,
} from '@/services/api-backend/@tanstack/react-query.gen';

type CustomNavigationOptions = {
  userId: string | undefined;
  firstname: string | undefined;
  lastname: string | undefined;
  homeFavorite: string | undefined;
};

export default function GeneralSettings() {
  const queryClient = useQueryClient();

  const params = useLocalSearchParams() as CustomNavigationOptions;
  const initialFavorite = params.homeFavorite
    ? (JSON.parse(params.homeFavorite) as Favorite)
    : undefined;

  const [firstname, setFirstname] = useState(params?.firstname ?? '');
  const [lastname, setLastname] = useState(params?.lastname ?? '');
  const [home, setHome] = useState<UpdateFavoriteDto | undefined>(
    initialFavorite
  );

  const { mutateAsync: updateUser } = useMutation({
    ...usersControllerUpdateUserMutation(),
    onSuccess: () => {
      // Alert.alert('Benutzer erfolgreich bearbeitet.');
    },
    onError: (error) => {
      // Alert.alert('Fehler beim Aktualisieren des Benutzers:', error.message);
    },
  });

  const { mutateAsync: updateFavoriteHome } = useMutation({
    ...favoritesControllerUpdateFavoriteMutation(),
    onSuccess: () => {
      // Alert.alert('Heimatadresse erfolgreich aktualisiert.');
    },
    onError: (error) => {
      // Alert.alert(
      //   'Fehler beim Aktualisieren der Heimatadresse:',
      //   error.message
      // );
    },
  });

  const { mutateAsync: createFavoriteHome } = useMutation({
    ...favoritesControllerCreateFavoriteMutation({}),
    onSuccess: () => {
      // Alert.alert('Heimatadresse erfolgreich erstellt.');
    },
    onError: (error) => {
      // Alert.alert('Fehler beim Erstellen der Heimatadresse:', error.message);
    },
  });

  const saveSettings = async () => {
    const updatePromises: Promise<any>[] = [];
    const userUpdates: UpdateUserDto = {
      calibrationFactor: null,
    };

    // Check for changes in user details
    if (firstname !== params.firstname) {
      userUpdates.firstname = firstname;
    }
    if (lastname !== params.lastname) {
      userUpdates.lastname = lastname;
    }

    if (params.userId && Object.keys(userUpdates).length > 0) {
      updatePromises.push(
        updateUser({
          body: userUpdates,
          path: { userId: params.userId },
        })
      );
    }

    // Check for changes in home address
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
        // console.log({
        //   body: {
        //     ...home,
        //   },
        //   path: { favoriteId: initialFavorite.id },
        // });
        updatePromises.push(
          updateFavoriteHome({
            body: {
              destinationType: home.destinationType,
              isPinned: home.isPinned,
              photonFeature: home.photonFeature,
              title: home.title,
            },
            path: { favoriteId: initialFavorite.id },
          })
        );
      } else {
        updatePromises.push(
          createFavoriteHome({
            body: {
              title: home.title,
              destinationType: home.destinationType,
              isPinned: home.isPinned,
              photonFeature: home.photonFeature,
            },
          })
        );
      }
    }
    // // Execute all updates in parallel
    try {
      await Promise.all(updatePromises);
      await queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.user] });
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.home_address],
      });
      Alert.alert('Einstellungen erfolgreich gespeichert.');
      router.back();
    } catch (error: any) {
      Alert.alert('Fehler beim Speichern der Einstellungen:', error.message);
    }
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
          onChange={(photonFeature) =>
            setHome((prevState) => ({
              ...prevState,
              title: 'Heimatadresse',
              destinationType: 'home',
              isPinned: true,
              photonFeature: photonFeature || undefined,
            }))
          }
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
        <Button width="half" onPress={saveSettings} buttonType="accent">
          Speichern
        </Button>
      </View>
    </ModalWrapper>
  );
}
