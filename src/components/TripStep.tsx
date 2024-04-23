import { router } from 'expo-router';
import React from 'react';
import { SafeAreaView, ScrollView, Text } from 'react-native';

import { Button } from '@/components/atoms/Button';

interface TripStepProps {
  children: React.ReactNode;
}
export function TripStep({ children }: TripStepProps) {
  return (
    <SafeAreaView className="flex-1">
      <ScrollView className="mx-5 my-5">
        {children}

        <Button onPress={() => router.replace('/home')} buttonType="secondary">
          <Text>Beenden</Text>
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
}
