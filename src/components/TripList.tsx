import { router } from 'expo-router';
import React from 'react';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';

import { Button } from '@/components/atoms/Button';
import { ListItem } from '@/components/atoms/ListItem';
import { valueOutput } from '@/functions/functions';
import { TripProps } from '@/types/Valhalla-Types';

export function TripList({ data }: { data: TripProps }) {
  return (
    <SafeAreaView className="flex-1">
      <ScrollView className="mx-5 my-5">
        {
          // currentLocation &&
          data &&
            data.legs[0].maneuvers.map((maneuver, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <ListItem key={index}>
                {index + 1}. {valueOutput(maneuver, 1)}
              </ListItem>
            ))
        }
      </ScrollView>
      <View className="mx-5">
        <Button onPress={() => router.back()} buttonType="secondary">
          <Text>Beenden</Text>
        </Button>
      </View>
    </SafeAreaView>
  );
}
