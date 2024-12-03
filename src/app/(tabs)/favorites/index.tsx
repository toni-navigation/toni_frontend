import { useSuspenseQuery } from '@tanstack/react-query';
import { router } from 'expo-router';
import React from 'react';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';

import { themes } from '@/colors';
import { Button } from '@/components/atoms/Button';
import { Header } from '@/components/atoms/Header';
import { MenuButton } from '@/components/atoms/MenuButton';
import { ToniLocation } from '@/components/atoms/icons/ToniLocation';
import { BASE_URL } from '@/functions/api';
import { favoritesControllerFindAllFavorites } from '@/services/api-backend';
import { useAuthStore } from '@/store/useAuthStore';
import { useFavoriteStore } from '@/store/useFavoritesStore';

export default function FavoritesPage() {
  // const favorites = useFavoriteStore((state) => state.favorites);
  const { resetFavoritesStore } = useFavoriteStore((state) => state.actions);
  const token = useAuthStore((state) => state.token);
  const fetchFavorites = async () => {
    const response = await favoritesControllerFindAllFavorites({
      headers: {
        Authorization: `Bearer ${token}`,
      },
      baseUrl: BASE_URL,
    });

    if (response.error) {
      throw new Error(response.error.message);
    }

    return response.data;
  };
  const { data: favorites, error } = useSuspenseQuery({
    queryKey: ['favorites'],
    queryFn: () => fetchFavorites(),
  });

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView className="px-8 py-8">
        <Header>Meine Favoriten</Header>
        <View className="mt-8">
          {favorites.length === 0 ? (
            <Text className="font-atkinsonRegular text-2xl text-textColor">
              Noch keine Favoriten vorhanden
            </Text>
          ) : (
            favorites.map((favorite) => (
              <MenuButton
                key={favorite.id}
                onPress={() => {
                  router.push({
                    pathname: '/favorites/[id]',
                    params: { id: favorite.id },
                  });
                }}
                icon={
                  <ToniLocation
                    fillOuter={themes.external[`--accent`]}
                    fillInner={themes.external[`--accent`]}
                    width={50}
                    height={50}
                  />
                }
              >
                {favorite.name}
              </MenuButton>
            ))
          )}
        </View>
      </ScrollView>
      <View className="mx-5 mb-8">
        <Button
          width="full"
          onPress={() => resetFavoritesStore()}
          buttonType="accentOutline"
        >
          Alle löschen
        </Button>
        <Button
          width="full"
          onPress={() => router.push('/favorites/create')}
          buttonType="accent"
        >
          Favorit hinzufügen
        </Button>
      </View>
    </SafeAreaView>
  );
}
