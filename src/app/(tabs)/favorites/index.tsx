import { router } from 'expo-router';
import React, { useContext } from 'react';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';

import { themes } from '@/colors';
import { ThemeContext } from '@/components/ThemeProvider';
import { Button } from '@/components/atoms/Button';
import { Header } from '@/components/atoms/Header';
import { MenuButton } from '@/components/atoms/MenuButton';
import { Heart } from '@/components/atoms/icons/Heart';
import { useFavoriteStore } from '@/store/useFavoritesStore';

export default function FavoritesPage() {
  const favorites = useFavoriteStore((state) => state.favorites);
  const { resetFavoritesStore } = useFavoriteStore((state) => state.actions);
  const { theme } = useContext(ThemeContext);

  return (
    <SafeAreaView className="flex-1 bg-background">
      {/* eslint-disable-next-line react/jsx-no-undef */}
      <ScrollView className="px-8 my-8">
        <Header classes="text-textColor">Meine Favoriten</Header>
        <View>
          {favorites.length === 0 ? (
            <Text className="font-atkinsonRegular text-2xl text-textColor">
              Noch keine Favoriten vorhanden
            </Text>
          ) : (
            favorites.map((favorite, index) => (
              <MenuButton
                // eslint-disable-next-line react/no-array-index-key
                key={index}
                onPress={() => {
                  router.push({
                    pathname: '/favorites/[id]',
                    params: { id: favorite.id },
                  });
                }}
                // icon="heart"
                icon={
                  <Heart
                    fill={themes.external[`--${theme}-mode-primary`]}
                    width={50}
                    height={50}
                  />
                }
              >
                {favorite.title}
              </MenuButton>
            ))
          )}
        </View>
      </ScrollView>
      <View className="mx-5 mb-8">
        <Button
          onPress={() => resetFavoritesStore()}
          buttonType="accentOutline"
        >
          Alle löschen
        </Button>
        <Button
          onPress={() => router.push('/favorites/create')}
          buttonType="accent"
        >
          Favorit hinzufügen
        </Button>
      </View>
    </SafeAreaView>
  );
}
