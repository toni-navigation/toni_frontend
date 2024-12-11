import { useQuery } from '@tanstack/react-query';
import { router } from 'expo-router';
import React from 'react';
import {
  ActivityIndicator,
  Dimensions,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from 'react-native';

import { Button } from '@/components/atoms/Button';
import { FavoritesCard } from '@/components/atoms/FavoritesCard';
import { Header } from '@/components/atoms/Header';
import { favoritesControllerFindAllFavoritesOptions } from '@/services/api-backend/@tanstack/react-query.gen';
import { useAuthStore } from '@/store/useAuthStore';
import { useFavoriteStore } from '@/store/useFavoriteStore';

export default function FavoritesPage() {
  const { resetFavoritesStore } = useFavoriteStore((state) => state.actions);
  const token = useAuthStore((state) => state.token);

  const {
    data: favorites,
    error,
    isError,
    isPending,
  } = useQuery({
    ...favoritesControllerFindAllFavoritesOptions(),
    queryKey: ['favorites', token],
  });
  const screenHeight = Dimensions.get('window').height;
  const viewHeight = 0.12 * screenHeight;

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-1 bg-invertedPrimary">
        <View
          style={{ height: viewHeight }}
          className="px-8 py-8 bg-background rounded-b-[25]"
        >
          <Header>Meine Favoriten</Header>
        </View>
        <View />
        <ScrollView>
          {isPending && <ActivityIndicator size="large" />}
          {isError && (
            <View>
              <Text className="font-atkinsonRegular text-2xl text-textColor">
                {error.message}
              </Text>
            </View>
          )}
          <View className="mt-8 mx-5 ">
            {!favorites ||
              (favorites.length === 0 && (
                <Text className="font-atkinsonRegular text-2xl text-textColor">
                  Noch keine Favoriten vorhanden
                </Text>
              ))}
            {favorites &&
              favorites?.length > 0 &&
              favorites.map((favorite) => (
                <FavoritesCard key={favorite.id} favorite={favorite} />
              ))}
          </View>
        </ScrollView>
        <View className="flex flex-row mx-5 mb-5 items-center justify-center">
          <Button
            width="full"
            onPress={() => {
              resetFavoritesStore();
              router.push('/favorites/create');
            }}
            buttonType="accent"
          >
            Neu
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
}
