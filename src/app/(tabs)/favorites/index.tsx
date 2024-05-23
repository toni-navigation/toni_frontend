import { Link } from 'expo-router';
import { SafeAreaView, ScrollView, Text, useColorScheme } from 'react-native';

import { Header } from '@/components/atoms/Header';

export default function FavoritesPage() {
  const colorscheme = useColorScheme();

  return (
    <SafeAreaView
      className={`flex-1 ${colorscheme === 'light' ? 'bg-background-light' : 'bg-background-dark'}`}
    >
      {/* eslint-disable-next-line react/jsx-no-undef */}
      <ScrollView className="px-8 my-8">
        <Header
          classes={`${colorscheme === 'light' ? 'text-text-color-light' : 'text-background-light'}`}
        >
          Meine Favoriten
        </Header>
        <Text>Favoriten Liste</Text>
        <Link href="/favorites/modal/1">Present modal</Link>
      </ScrollView>
    </SafeAreaView>
  );
}
