import { router } from 'expo-router';
import React from 'react';
import { SafeAreaView, ScrollView, useColorScheme, View } from 'react-native';

import { Button } from '@/components/atoms/Button';
import { Header } from '@/components/atoms/Header';

export default function FavoritesPage() {
  const colorscheme = useColorScheme();

  return (
    <SafeAreaView
      className={`flex-1 ${colorscheme === 'light' ? 'bg-background-light' : 'bg-background-dark'}`}
    >
      {/* eslint-disable-next-line react/jsx-no-undef */}
      <ScrollView className="px-8 my-8">
        <Header>Meine Favoriten</Header>
      </ScrollView>
      <View className="mx-5 mb-8">
        <Button
          onPress={() => {
            router.push('/favorites/create');
          }}
          disabled={false}
          buttonType="accentOutline"
        >
          Favorit hinzufügen
        </Button>
      </View>
    </SafeAreaView>
  );
}
