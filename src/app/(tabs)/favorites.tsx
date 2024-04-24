import { SafeAreaView, ScrollView, Text, useColorScheme } from 'react-native';

import { Header } from '@/components/atoms/Header';

export default function Page() {
  const colorscheme = useColorScheme();

  return (
    <SafeAreaView
      className={`flex-1 ${colorscheme === 'light' ? 'bg-background-light' : 'bg-background-dark'}`}
    >
      {/* eslint-disable-next-line react/jsx-no-undef */}
      <ScrollView className="mx-8 my-8">
        <Header>Meine Favoriten</Header>
        <Text>Favoriten Liste</Text>
      </ScrollView>
    </SafeAreaView>
  );
}
