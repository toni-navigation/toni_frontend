import React from 'react';
import { SafeAreaView, ScrollView } from 'react-native';

import { Header } from '@/components/atoms/Header';
import { Form } from '@/components/organisms/Form';

export default function CreatePage() {
  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView className="px-8 my-8" keyboardShouldPersistTaps="always">
        <Header classes="text-textColor">Favorit hinzufügen</Header>

        <Form />
      </ScrollView>
    </SafeAreaView>
  );
}
