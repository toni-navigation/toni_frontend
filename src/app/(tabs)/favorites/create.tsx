import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { SafeAreaView, ScrollView } from 'react-native';

import { Header } from '@/components/atoms/Header';
import { Form } from '@/components/organisms/Form';

export type SearchParamType = {
  id: string | undefined;
  title: string | undefined;
  address: string | undefined;
};

export default function CreatePage() {
  const { id, title, address } = useLocalSearchParams() as SearchParamType;

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView className="px-8 my-8" keyboardShouldPersistTaps="always">
        <Header classes="text-textColor">
          {id === undefined ? 'Favorit hinzufügen' : 'Favorit bearbeiten'}
        </Header>

        <Form id={id} title={title} address={address && JSON.parse(address)} />
      </ScrollView>
    </SafeAreaView>
  );
}
