import { router } from 'expo-router';
import React from 'react';
import { Dimensions, SafeAreaView, ScrollView, Text, View } from 'react-native';

import { themes } from '@/colors';
import { Button } from '@/components/atoms/Button';
import { FavoritesCard } from '@/components/atoms/FavoritesCard';
import { Header } from '@/components/atoms/Header';
import { ToniLocation } from '@/components/atoms/icons/ToniLocation';
import { useFavoriteStore } from '@/store/useFavoritesStore';

export default function FavoritesPage() {
  const favorites = useFavoriteStore((state) => state.favorites);
  const { resetFavoritesStore } = useFavoriteStore((state) => state.actions);
  // const token = useAuthStore((state) => state.token);
  // const fetchFavorites = async () => {
  //   const response = await favoritesControllerFindAllFavorites({
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //     baseUrl: BASE_URL,
  //   });
  //
  //   if (response.error) {
  //     throw new Error(response.error.message);
  //   }
  //
  //   return response.data;
  // };
  // const { data: favorites, error } = useSuspenseQuery({
  //   queryKey: ['favorites'],
  //   queryFn: () => fetchFavorites(),
  // });
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
          <View className="mt-8 mx-5 ">
            {favorites.length === 0 ? (
              <Text className="font-atkinsonRegular text-2xl text-textColor">
                Noch keine Favoriten vorhanden
              </Text>
            ) : (
              favorites.map((favorite) => (
                <FavoritesCard
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
                      stroke={themes.external[`--accent`]}
                      fillInner={themes.external[`--accent`]}
                      width={36}
                      height={36}
                    />
                  }
                >
                  {favorite.title}
                </FavoritesCard>
              ))
            )}
          </View>
        </ScrollView>
        <View className="flex flex-row mx-5 mb-5 gap-1.5">
          <Button
            width="half"
            onPress={() => resetFavoritesStore()}
            buttonType="accentOutline"
            accessibilityLabel="Alle Favoriten löschen"
            accessibilityHint="Löscht alle Favoriten"
          >
            Alle löschen
          </Button>
          <Button
            width="half"
            onPress={() => router.push('/favorites/create')}
            buttonType="accent"
            accessibilityLabel="Neuen Favoriten erstellen"
            accessibilityHint="Navigiert zur Seite zum Erstellen eines neuen Favoriten"
          >
            Neu
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
}
