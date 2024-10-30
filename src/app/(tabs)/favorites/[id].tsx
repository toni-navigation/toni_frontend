import { router, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';

import { Button } from '@/components/atoms/Button';
import { Header } from '@/components/atoms/Header';
import { PopUp } from '@/components/organisms/PopUp';
import { useCurrentLocationStore } from '@/store/useCurrentLocationStore';
import { useFavoriteStore } from '@/store/useFavoritesStore';
import { useTripStore } from '@/store/useTripStore';

export default function FavoritePage() {
  const { changeDestination } = useTripStore((state) => state.actions);
  const [showPopUp, setShowPopUp] = React.useState(false);
  const favorites = useFavoriteStore((state) => state.favorites);
  const { deleteFavorite } = useFavoriteStore((state) => state.actions);

  const { id } = useLocalSearchParams();

  const favorite = favorites.find((favoriteItem) => favoriteItem.id === id);
  const currentLocation = useCurrentLocationStore(
    (state) => state.currentLocation
  );

  const navigateToTrip = (params: {
    origin: number[];
    destination: number[];
  }) => {
    router.push({ pathname: `/trip`, params });
  };

  const startNavigationFromFavorite = async () => {
    if (currentLocation && favorite?.address) {
      changeDestination(favorite.address);
      navigateToTrip({
        origin: [
          currentLocation.coords.longitude,
          currentLocation.coords.latitude,
        ],
        destination: favorite.address.geometry.coordinates,
      });
    }
  };

  if (!favorite) return null;

  return (
    <SafeAreaView className="flex-1 bg-background">
      {/* eslint-disable-next-line react/jsx-no-undef */}
      <ScrollView className="px-8 my-8" keyboardShouldPersistTaps="always">
        <Header>{favorite.title}</Header>
        <View>
          {favorite.address?.properties?.name && (
            <Text className="text-2xl font-atkinsonRegular flex-1 text-textColor">
              {favorite.address?.properties?.name}
            </Text>
          )}
          {favorite.address?.properties?.street && (
            <Text className="text-2xl font-atkinsonRegular flex-1 text-textColor">
              Straße: {favorite.address?.properties?.street}
            </Text>
          )}
          {favorite.address?.properties?.housenumber && (
            <Text className="text-2xl font-atkinsonRegular flex-1 text-textColor">
              Hausnummer: {favorite.address?.properties?.housenumber}
            </Text>
          )}
          {favorite.address?.properties?.postcode && (
            <Text className="text-2xl font-atkinsonRegular flex-1 text-textColor">
              Postleitzahl: {favorite.address?.properties?.postcode}
            </Text>
          )}
          {favorite.address?.properties?.city && (
            <Text className="text-2xl font-atkinsonRegular flex-1 text-textColor">
              Ort: {favorite.address?.properties?.city}
            </Text>
          )}

          <PopUp
            visible={showPopUp}
            onClickButtonText="Ja"
            onCloseClick={() => setShowPopUp(false)}
            onCloseButtonText="Nein"
            onDismiss={() => {}}
            onClick={() => {
              setShowPopUp(false);
              deleteFavorite(favorite.id);
              router.push('/favorites');
            }}
          >
            <Text className="text-2xl text-text-col font-atkinsonRegular text-center text-background">
              Möchtest du den Favorit {favorite.title} wirklich löschen?
            </Text>
          </PopUp>
        </View>
      </ScrollView>
      <View className="mx-5 mb-8">
        <Button
          onPress={() => {
            router.push({
              pathname: '/favorites/create',
              params: {
                id: favorite.id,
                title: favorite.title,
                address: JSON.stringify(favorite.address),
              },
            });
          }}
          buttonType="primaryOutline"
        >
          Bearbeiten
        </Button>
        <Button
          onPress={() => {
            setShowPopUp(true);
          }}
          buttonType="primaryOutline"
        >
          Löschen
        </Button>
        <Button
          onPress={() => startNavigationFromFavorite()}
          disabled={favorite.address === undefined}
          buttonType="accent"
        >
          Route starten
        </Button>
      </View>
    </SafeAreaView>
  );
}
