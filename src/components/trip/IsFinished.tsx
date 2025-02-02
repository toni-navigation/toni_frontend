import { router } from 'expo-router';
import React, { useContext } from 'react';
import { SafeAreaView, Text, View } from 'react-native';

import { themes } from '@/colors';
import { ThemeContext } from '@/components/ThemeProvider';
import { BigHeader } from '@/components/atoms/BigHeader';
import { Button } from '@/components/atoms/Button';
import { Flag } from '@/components/atoms/icons/Flag';
import { Card } from '@/components/organisms/Card';
import { useFavoriteStore } from '@/store/useFavoriteStore';
import { useTripStore } from '@/store/useTripStore';

export function IsFinished() {
  const destination = useTripStore((state) => state.destination);
  const { addPhotonFeature } = useFavoriteStore((state) => state.actions);
  const { theme } = useContext(ThemeContext);

  const createDestinationPhotonValue = async () => {
    if (!destination) return;

    addPhotonFeature(destination);
    router.replace('/favorites');
    router.push({
      pathname: '/favorites/create',
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <BigHeader classes="text-invertedPrimary">Geschafft</BigHeader>
      <View className="flex-1 px-8 my-8">
        <Card>
          <Flag
            fill={themes.external[`--${theme}-mode-primary`]}
            width={150}
            height={150}
          />
          <Text>Ziel erreicht !</Text>
        </Card>
      </View>

      <View className="mx-5 mb-5">
        <Button
          width="full"
          onPress={createDestinationPhotonValue}
          buttonType="accentOutline"
        >
          Zu Favoriten hinzufügen
        </Button>
        <Button width="full" onPress={() => router.back()} buttonType="accent">
          Fertig!
        </Button>
      </View>
    </SafeAreaView>
  );
}
