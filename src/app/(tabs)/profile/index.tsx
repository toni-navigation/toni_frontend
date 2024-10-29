import { router } from 'expo-router';
import React, { useContext } from 'react';
import { SafeAreaView, ScrollView, Text } from 'react-native';

import { themes } from '@/colors';
import { ThemeContext } from '@/components/ThemeProvider';
import { BigHeader } from '@/components/atoms/BigHeader';
import { Button } from '@/components/atoms/Button';
import { MenuButton } from '@/components/atoms/MenuButton';
import { Person } from '@/components/atoms/icons/Person';
import { StepLength } from '@/components/atoms/icons/StepLength';

export default function ProfilePage() {
  const { theme } = useContext(ThemeContext);

  return (
    <SafeAreaView className="flex-1 bg-background">
      <BigHeader classes="text-invertedPrimary">Profil</BigHeader>
      <ScrollView className="px-8 my-8">
        <Text className="font-atkinsonRegular text-2xl text-textColor">
          Schrittlänge:
        </Text>
        <Button
          onPress={() => {
            router.push('../calibration/0?fromIntro=false');
          }}
          buttonType="primaryOutline"
        >
          Neu kalibrieren
        </Button>

        {/* <MenuButton */}
        {/*  onPress={() => { */}
        {/*    router.push('/profile/calibration/0'); */}
        {/*  }} */}
        {/*  icon={ */}
        {/*    <Person */}
        {/*      fill={themes.external[`--${theme}-mode-primary`]} */}
        {/*      width={50} */}
        {/*      height={50} */}
        {/*    /> */}
        {/*  } */}
        {/* > */}
        {/*  Profil bearbeiten */}
        {/* </MenuButton> */}
        {/* <MenuButton */}
        {/*  onPress={() => { */}
        {/*    router.push('/profile/calibration/0'); */}
        {/*  }} */}
        {/*  icon={ */}
        {/*    <StepLength */}
        {/*      fill={themes.external[`--${theme}-mode-primary`]} */}
        {/*      width={50} */}
        {/*      height={50} */}
        {/*    /> */}
        {/*  } */}
        {/* > */}
        {/*  Schrittlänge */}
        {/* </MenuButton> */}
        {/* <MenuButton onPress={() => router.push('/profile')} icon="audio">
          Audio
          </MenuButton> */}
      </ScrollView>
    </SafeAreaView>
  );
}
