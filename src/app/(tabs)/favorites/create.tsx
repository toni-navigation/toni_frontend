import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { SafeAreaView, ScrollView, useColorScheme } from 'react-native';

import { Header } from '@/components/atoms/Header';
import { Form } from '@/components/organisms/Form';
import { OriginDestinationType } from '@/store/useTripStore';

export type SearchParamType = {
  id: string;
  title: string;
  address: string | undefined;
};

export default function CreatePage() {
  const colorscheme = useColorScheme();
  const { id, title, address } = useLocalSearchParams() as SearchParamType;
  let addressParam: OriginDestinationType;
  if (address) {
    addressParam = JSON.parse(address);
  }

  return (
    <SafeAreaView
      className={`flex-1 ${colorscheme === 'light' ? 'bg-background-light' : 'bg-background-dark'}`}
    >
      {/* eslint-disable-next-line react/jsx-no-undef */}
      <ScrollView className="px-8 my-8" keyboardShouldPersistTaps="always">
        <Header>
          {id === undefined ? 'Favorit hinzufügen' : 'Favorit bearbeiten'}
        </Header>

        <Form idProp={id} titleProp={title} addressProp={addressParam} />
      </ScrollView>
    </SafeAreaView>
  );
}
