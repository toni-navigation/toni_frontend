import React from 'react';
import { SafeAreaView, ScrollView, useColorScheme } from 'react-native';

import { Header } from '@/components/atoms/Header';
import { Formular } from '@/components/organisms/Formular';

export default function CreatePage() {
  const colorscheme = useColorScheme();

  return (
    <SafeAreaView
      className={`flex-1 ${colorscheme === 'light' ? 'bg-background-light' : 'bg-background-dark'}`}
    >
      {/* eslint-disable-next-line react/jsx-no-undef */}
      <ScrollView className="px-8 my-8">
        <Header>Favorit hinzufügen</Header>
        <Formular />
      </ScrollView>
    </SafeAreaView>
  );
}
