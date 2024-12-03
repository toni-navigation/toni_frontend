import { useSuspenseQuery } from '@tanstack/react-query';
import { router } from 'expo-router';
import React, { Suspense } from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from 'react-native';

import { BigHeader } from '@/components/atoms/BigHeader';
import { Button } from '@/components/atoms/Button';
import { Favorite, Favorites } from '@/components/favorite/Favorite';
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
      <BigHeader classes="text-invertedPrimary">Meine Favoriten</BigHeader>
      <ScrollView className="px-8 py-8">
        <View>
          {error && (
            <Text className="font-atkinsonRegular text-2xl text-textColor">
              {error.message}
            </Text>
          )}
          <Suspense fallback={<ActivityIndicator size="large" />}>
            {favorites.length === 0 ? (
              <Text className="font-atkinsonRegular text-2xl text-textColor">
                Noch keine Favoriten vorhanden
              </Text>
            ) : (
              favorites.map((favorite) => (
                <Favorites
                  photonFeature={favorite.photonFeature}
                  name={favorite.name}
                  destinationType={favorite.destinationType}
                  key={favorite.id}
                />
              ))
            )}
          </Suspense>
          {/*  */}
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
