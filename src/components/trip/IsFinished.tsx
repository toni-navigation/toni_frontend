import { router } from 'expo-router';
import React, { useContext } from 'react';
import { SafeAreaView, Text, View } from 'react-native';

import { themes } from '@/colors';
import { ThemeContext } from '@/components/ThemeProvider';
import { Button } from '@/components/atoms/Button';
import { Header } from '@/components/atoms/Header';
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
    <SafeAreaView className="flex-1 mx-5 mt-8">
      <Header classes="mb-8">Geschafft!</Header>
      <Card>
        <View className="flex-1 items-center justify-center">
          <Flag
            fill={themes.external[`--${theme}-mode-primary`]}
            width={150}
            height={150}
          />
          <Text className="text-medium text-textColor font-atkinsonRegular mt-5">
            Ziel erreicht!
          </Text>
        </View>
      </Card>

      <View className="flex flex-row my-8 gap-1.5">
        <Button
          width="half"
          onPress={createDestinationPhotonValue}
          buttonType="primaryOutline"
        >
          Zu Favoriten
        </Button>
        <Button width="half" onPress={() => router.back()} buttonType="accent">
          Fertig!
        </Button>
      </View>
    </SafeAreaView>
  );
}
