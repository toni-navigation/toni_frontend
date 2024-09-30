import Checkbox from 'expo-checkbox';
import { router } from 'expo-router';
import React, { useContext, useState } from 'react';
import { Linking, SafeAreaView, ScrollView, Text, View } from 'react-native';

import { themes } from '@/colors';
import { ThemeContext } from '@/components/ThemeProvider';
import { Welcome } from '@/components/Welcome';
import { Button } from '@/components/atoms/Button';
import { Header } from '@/components/atoms/Header';
import { Logo } from '@/components/atoms/icons/Logo';

export default function Agbs() {
  const [isCheckedAgbs, setCheckedAgbs] = useState(false);
  const [isCheckedNutzungsbedingungen, setCheckedNutzungsbedingungen] =
    useState(false);
  const [isCheckedDatenschutz, setCheckedDatenschutz] = useState(false);
  const [showWelcome, setShowWelcome] = React.useState(false);
  const { theme } = useContext(ThemeContext);

  if (showWelcome) {
    return <Welcome />;
  }

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView className="px-8 py-8">
        <View className="flex items-center pb-8">
          <Logo width={100} height={100} />
          <Header classes="pt-4">Die Pflicht ruft</Header>
          <Text className="mx-auto text-center font-atkinsonRegular text-2xl text-textColor">
            Bitte akzeptiere unsere AGBs, die Nutzungsbedingungen und
            Richtlinien zum Datenschutz.
          </Text>
        </View>
        <View className="flex-row items-center pb-8">
          <Checkbox
            className="border-primary"
            color={
              isCheckedNutzungsbedingungen
                ? `${themes.external[`--${theme}-mode-primary`]}`
                : undefined
            }
            value={isCheckedNutzungsbedingungen}
            onValueChange={setCheckedNutzungsbedingungen}
          />
          <Text className="px-4">
            Hiermit akzeptiere ich die{' '}
            <Text
              accessibilityLabel="Nutzungsbedingungen"
              accessibilityRole="link"
              accessibilityHint="Link zu den Nutzungsbedingungen"
              className="text-accent"
              onPress={() => Linking.openURL('https://example.com')}
            >
              Nutzungsbedingungen
            </Text>
            .
          </Text>
        </View>
        <View className="flex-row items-center pb-8">
          <Checkbox
            className="border-primary"
            color={
              isCheckedAgbs
                ? `${themes.external[`--${theme}-mode-primary`]}`
                : undefined
            }
            value={isCheckedAgbs}
            onValueChange={setCheckedAgbs}
          />
          <Text className="px-4">
            Hiermit akzeptiere ich die{' '}
            <Text
              accessibilityLabel="AGBs"
              accessibilityRole="link"
              accessibilityHint="Link zu den AGBs"
              className="text-accent"
              onPress={() => Linking.openURL('https://example.com')}
            >
              AGBs
            </Text>
            .
          </Text>
        </View>
        <View className="flex-row items-center pb-8">
          <Checkbox
            className="border-primary"
            color={
              isCheckedDatenschutz
                ? `${themes.external[`--${theme}-mode-primary`]}`
                : undefined
            }
            value={isCheckedDatenschutz}
            onValueChange={setCheckedDatenschutz}
          />
          <Text className="px-4">
            Hiermit akzeptiere ich die{' '}
            <Text
              accessibilityLabel="Datenschutz Richtlinien"
              accessibilityRole="link"
              accessibilityHint="Link zu den Datenschutz Richtlinien"
              className="text-accent"
              onPress={() => Linking.openURL('https://example.com')}
            >
              Datenschutz Richtlinien
            </Text>
            .
          </Text>
        </View>
      </ScrollView>

      <View className="mx-8 mb-3">
        <Button
          disabled={
            !isCheckedAgbs ||
            !isCheckedNutzungsbedingungen ||
            !isCheckedDatenschutz
          }
          buttonType="accent"
          onPress={() => setShowWelcome(true)}
        >
          Weiter
        </Button>
      </View>
    </SafeAreaView>
  );
}
