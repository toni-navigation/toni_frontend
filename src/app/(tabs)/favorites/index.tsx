import { router } from 'expo-router';
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
import { MenuButton } from '@/components/atoms/MenuButton';
import { useFavoriteStore } from '@/store/useFavoritesStore';

export default function FavoritesPage() {
  const colorscheme = useColorScheme();
  const favorites = useFavoriteStore((state) => state.favorites);

  return (
    <SafeAreaView
      className={`flex-1 ${colorscheme === 'light' ? 'bg-background-light' : 'bg-background-dark'}`}
    >
      {/* eslint-disable-next-line react/jsx-no-undef */}
      <ScrollView className="px-8 my-8">
        <Header>Meine Favoriten</Header>
        <View>
          {favorites.length === 0 ? (
            <Text
              className={`font-atkinsonRegular text-2xl ${colorscheme === 'light' ? 'text-text-color-light' : 'text-background-light'}`}
            >
              Noch keine Favoriten vorhanden
            </Text>
          ) : (
            favorites.map((favorite, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <MenuButton
                key={index}
                onPress={() => {
                  router.push({
                    pathname: '/favorites/[id]',
                    params: { id: favorite.id },
                  });
                }}
                icon="heart"
              >
                {favorite.title}
              </MenuButton>
            ))
          )}
        </View>
      </ScrollView>
      <View className="mx-5 mb-8">
        <Button
          onPress={() => router.push('/favorites/create')}
          buttonType="accentOutline"
        >
          Favorit hinzufügen
        </Button>
      </View>
    </SafeAreaView>
  );
}
