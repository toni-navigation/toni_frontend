import { router, useLocalSearchParams } from 'expo-router';
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import { Button } from '@/components/atoms/Button';
import { Header } from '@/components/atoms/Header';
import { PopUp } from '@/components/organisms/PopUp';
import { photonValue } from '@/functions/photonValue';
import { useFavoriteStore } from '@/store/useFavoritesStore';

export default function FavoritePage() {
  const [showPopUp, setShowPopUp] = React.useState(false);
  const favorites = useFavoriteStore((state) => state.favorites);
  const { deleteFavorite } = useFavoriteStore((state) => state.actions);

  const colorscheme = useColorScheme();
  const { id } = useLocalSearchParams();

  const favorite = favorites.find((favoriteItem) => favoriteItem.id === id);
  if (!favorite) return null;

  return (
    <SafeAreaView
      className={`flex-1 ${colorscheme === 'light' ? 'bg-background-light' : 'bg-background-dark'}`}
    >
      {/* eslint-disable-next-line react/jsx-no-undef */}
      <ScrollView className="px-8 my-8" keyboardShouldPersistTaps="always">
        <Header>{favorite.title}</Header>
        <View>
          {favorite.address?.properties?.name && (
            <Text
              className={`text-2xl font-atkinsonRegular flex-1 ${colorscheme === 'light' ? 'text-text-color-light' : 'text-background-light'}`}
            >
              {favorite.address?.properties?.name}
            </Text>
          )}
          {favorite.address?.properties?.street && (
            <Text
              className={`text-2xl font-atkinsonRegular ${colorscheme === 'light' ? 'text-text-color-light' : 'text-background-light'}`}
            >
              Straße: {favorite.address?.properties?.street}
            </Text>
          )}
          {favorite.address?.properties?.housenumber && (
            <Text
              className={`text-2xl font-atkinsonRegular ${colorscheme === 'light' ? 'text-text-color-light' : 'text-background-light'}`}
            >
              Hausnummer: {favorite.address?.properties?.housenumber}
            </Text>
          )}
          {favorite.address?.properties?.street && (
            <Text
              className={`text-2xl font-atkinsonRegular ${colorscheme === 'light' ? 'text-text-color-light' : 'text-background-light'}`}
            >
              Postleitzahl: {favorite.address?.properties?.postcode}
            </Text>
          )}
          {favorite.address?.properties?.housenumber && (
            <Text
              className={`text-2xl font-atkinsonRegular ${colorscheme === 'light' ? 'text-text-color-light' : 'text-background-light'}`}
            >
              Ort: {favorite.address?.properties?.city}
            </Text>
          )}

          <PopUp
            visible={showPopUp}
            onClick={() => {
              setShowPopUp(false);
              deleteFavorite(favorite.id);
              router.back();
            }}
            onClickButtonText="Ja"
            onCloseClick={() => setShowPopUp(false)}
            onCloseButtonText="Nein"
            colorscheme={colorscheme}
            // onDismiss={() => {}}
          >
            <Text
              className={`text-2xl text-text-col font-atkinsonRegular text-center text-text-color-${colorscheme}`}
            >
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
                address: photonValue(favorite.address),
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
        <Button onPress={() => {}} disabled buttonType="accent">
          Route starten
        </Button>
      </View>
    </SafeAreaView>
  );
}
