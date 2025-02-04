import React from 'react';
import { SafeAreaView, View } from 'react-native';

import { Header } from '@/components/atoms/Header';
import { Card } from '@/components/organisms/Card';

interface ModalWrapperProps {
  children: React.ReactNode;
  title: string;
}
export function ModalWrapper({ children, title }: ModalWrapperProps) {
  return (
    <SafeAreaView className="flex-1 bg-invertedPrimary">
      <View className="p-5 flex-1">
        <Header classes="mt-5 mb-8">{title}</Header>
        <Card color="background">{children}</Card>
      </View>
    </SafeAreaView>
  );
}
