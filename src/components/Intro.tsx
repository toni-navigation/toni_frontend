import React, { useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import { Button } from '@/components/atoms/Button';
import { Header } from '@/components/atoms/Header';
import { Logo } from '@/components/atoms/Logo';
import { Calibration } from '@/components/calibration/Calibration';

export function Intro() {
  const colorscheme = useColorScheme();
  const [index, setIndex] = React.useState(0);
  const [showCalibration, setShowCalibration] = React.useState(false);
  useEffect(() => {
    const toggle = setInterval(() => {
      if (index === 0) {
        setIndex(1);
      }
      if (index === 1) {
        setIndex(2);
      }
      if (index === 2) {
        setIndex(0);
      }
    }, 3000);

    return () => clearInterval(toggle);
  });
  if (showCalibration) {
    return <Calibration isFromIntro />;
  }

  return (
    <SafeAreaView
      className={`flex-1 ${colorscheme === 'light' ? 'bg-background-light' : 'bg-background-dark'}`}
    >
      <ScrollView className="px-8 pt-20 ">
        {index === 0 && (
          <>
            <View className="flex items-center pb-8">
              <Logo
                icon={`${colorscheme === 'light' ? 'logoLight' : 'logoDark'}`}
                size={115}
              />
            </View>
            <View className="flex items-center">
              <Header>Dein Weg</Header>
              <Text
                className={`mx-auto text-center font-atkinsonRegular text-xl ${colorscheme === 'light' ? 'text-text-color-light' : 'text-background-light'}`}
              >
                Toni führt dich, auf deine Schrittlänge konfiguriert, sicher an
                dein Ziel!
              </Text>
            </View>
          </>
        )}
        {index === 1 && (
          <>
            <View className="flex items-center pb-8">
              <Logo
                icon={`${colorscheme === 'light' ? 'logoLight' : 'logoDark'}`}
                size={115}
              />
            </View>
            <View className="flex items-center">
              <Header>Dein Klang</Header>
              <Text
                className={`mx-auto text-center font-atkinsonRegular text-xl ${colorscheme === 'light' ? 'text-text-color-light' : 'text-background-light'}`}
              >
                Entscheide individuell welche Stimme dich auf deinem Weg
                begleitet!
              </Text>
            </View>
          </>
        )}
        {index === 2 && (
          <>
            <View className="flex items-center pb-8">
              <Logo
                icon={`${colorscheme === 'light' ? 'logoLight' : 'logoDark'}`}
                size={115}
              />
            </View>
            <View className="flex items-center">
              <Header>Deine Freiheit</Header>
              <Text
                className={`mx-auto text-center font-atkinsonRegular text-xl ${colorscheme === 'light' ? 'text-text-color-light' : 'text-background-light'}`}
              >
                Für mehr Leichtigkeit und Selbständigkeit in deinem Alltag!
              </Text>
            </View>
          </>
        )}
      </ScrollView>
      <View className="mx-8 mb-3">
        <>
          <Button buttonType="accent" disabled onPress={() => {}}>
            Registrieren
          </Button>
          <Button
            buttonType="primary"
            disabled={false}
            onPress={() => setShowCalibration(true)}
          >
            Los gehts
          </Button>
        </>
      </View>
    </SafeAreaView>
  );
}
