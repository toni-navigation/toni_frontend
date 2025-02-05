import Checkbox from 'expo-checkbox';
import { router } from 'expo-router';
import React, { useContext, useState } from 'react';
import { Linking, SafeAreaView, ScrollView, Text, View } from 'react-native';

import { themes } from '@/colors';
import { ThemeContext } from '@/components/ThemeProvider';
import { Button } from '@/components/atoms/Button';
import { Header } from '@/components/atoms/Header';
import { ToniLogo } from '@/components/atoms/icons/ToniLogo';

export default function Agbs() {
  const [isCheckedAgbs, setCheckedAgbs] = useState(false);
  const [isCheckedNutzungsbedingungen, setCheckedNutzungsbedingungen] =
    useState(false);
  const [isCheckedDatenschutz, setCheckedDatenschutz] = useState(false);
  const { theme } = useContext(ThemeContext);

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView className="px-8 py-8">
        <View className="flex items-center pb-8">
          <ToniLogo width={100} height={100} />
          <Header classes="pt-5">Die Pflicht ruft</Header>
          <Text className="mx-auto py-5 text-center font-atkinsonRegular text-small text-textColor">
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
          <Text className="px-4 text-textColor text-small">
            Hiermit akzeptiere ich die{' '}
            <Text
              accessibilityLabel="Nutzungsbedingungen"
              accessibilityRole="link"
              accessibilityHint="Link zu den Nutzungsbedingungen"
              className="text-accent text-small"
              onPress={() =>
                Linking.openURL(
                  'https://toni-navigation.at/nutzungsbedingungen'
                )
              }
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
          <Text className="px-4 text-textColor text-small">
            Hiermit akzeptiere ich die{' '}
            <Text
              accessibilityLabel="AGBs"
              accessibilityRole="link"
              accessibilityHint="Link zu den AGBs"
              className="text-accent text-small"
              onPress={() => Linking.openURL('https://toni-navigation.at/agbs')}
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
          <Text className="px-4 text-textColor text-small">
            Hiermit akzeptiere ich die{' '}
            <Text
              accessibilityLabel="Datenschutz Richtlinien"
              accessibilityRole="link"
              accessibilityHint="Link zu den Datenschutz Richtlinien"
              className="text-accent text-small"
              onPress={() =>
                Linking.openURL('https://toni-navigation.at/datenschutz')
              }
            >
              Datenschutz Richtlinien
            </Text>
            .
          </Text>
        </View>
      </ScrollView>

      <View className="flex items-center justify-center mx-8 my-8">
        <Button
          width="third"
          disabled={
            !isCheckedAgbs ||
            !isCheckedNutzungsbedingungen ||
            !isCheckedDatenschutz
          }
          buttonType="accent"
          onPress={() => router.push('/intro')}
        >
          Weiter
        </Button>
      </View>
    </SafeAreaView>
  );
}
