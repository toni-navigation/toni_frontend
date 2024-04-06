import { router } from 'expo-router';
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import { Button } from '@/components/atoms/Button';

export default function CalibrationPage() {
  const colorscheme = useColorScheme();

  return (
    <SafeAreaView
      className={`flex-1 ${colorscheme === 'light' ? 'bg-background-light' : 'bg-background-dark'}`}
    >
      <ScrollView className="mx-5 my-5">
        <View>
          <Text className="text-4xl font-extrabold">Toni</Text>
          <Text className="text-lg">
            Nun kalibrieren wir deine Schrittlänge, damit die Navigation
            möglichst genau wird. Bitte stelle im Vorfeld sicher, dass die
            Strecke geeignet ist, also möglichst gerade und ohne Hindernisse.
            Solltest du dir unsicher sein, bitte eine andere Person um Hilfe.
            Drücke nun auf den Weiter Button und klicke dort auf &quot;Start
            Kalibrierung&quot; und gehe so lange gerade aus bis die Musik
            stoppt.
          </Text>
        </View>
        <Button
          buttonType="primary"
          onPress={() => router.push('/calibration')}
        >
          Weiter
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
}
