import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { SafeAreaView, ScrollView } from 'react-native';

import { Header } from '@/components/atoms/Header';
import { Form } from '@/components/organisms/Form';

export default function StartPage() {
  return (
    <SafeAreaView className="flex-1 bg-background">
      {/* eslint-disable-next-line react/jsx-no-undef */}
      <ScrollView className="px-8 my-8" keyboardShouldPersistTaps="always">
        <Header classes="text-textColor">Startpunkt suchen</Header>
      </ScrollView>
    </SafeAreaView>
  );
}
