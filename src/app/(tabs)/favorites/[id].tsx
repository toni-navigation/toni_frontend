import { router, useLocalSearchParams } from 'expo-router';
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  useColorScheme,
  Text,
  View,
} from 'react-native';

import { Button } from '@/components/atoms/Button';
import { Header } from '@/components/atoms/Header';
import { useFavoriteStore } from '@/store/useFavoritesStore';

export default function FavoritePage() {
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
          <Text
            className={`text-2xl font-atkinsonRegular flex-1 ${colorscheme === 'light' ? 'text-text-color-light' : 'text-background-light'}`}
          >{`${favorite.address?.properties?.street} ${favorite.address?.properties?.housenumber}`}</Text>
          <Text
            className={`text-2xl font-atkinsonRegular flex-1 ${colorscheme === 'light' ? 'text-text-color-light' : 'text-background-light'}`}
          >{`${favorite.address?.properties?.postcode} ${favorite.address?.properties?.city}`}</Text>
        </View>
      </ScrollView>
      <View className="mx-5 mb-8">
        <Button
          onPress={() => {
            router.back();
          }}
          disabled={false}
          buttonType="primaryOutline"
        >
          Zurück
        </Button>
        <Button
          onPress={() => {
            deleteFavorite(favorite.id);
            router.back();
          }}
          disabled={false}
          buttonType="primary"
        >
          Löschen
        </Button>
      </View>
    </SafeAreaView>
  );
}
