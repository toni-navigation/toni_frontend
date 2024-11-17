import { router } from 'expo-router';
import React from 'react';
import { SafeAreaView, ScrollView, Text } from 'react-native';

import { BigHeader } from '@/components/atoms/BigHeader';
import { Button } from '@/components/atoms/Button';
// import { getCalibrationValue } from '@/functions/getCalibrationValue';
import { useCalibrationStore } from '@/store/useCalibrationStore';

export default function ProfilePage() {
  const calibration = useCalibrationStore((state) => state.calibration);

  return (
    <SafeAreaView className="flex-1 bg-background">
      <BigHeader classes="text-invertedPrimary">Profil</BigHeader>
      <ScrollView className="px-8 my-8">
        <Text className="font-atkinsonRegular text-2xl text-textColor">
          Schrittlänge: {calibration.factor} m
        </Text>
        <Button
          width="full"
          onPress={() => {
            router.push('/profile/calibration');
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
