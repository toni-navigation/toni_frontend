import { router } from 'expo-router';
import React, { useState } from 'react';
import { SafeAreaView, Text, View } from 'react-native';

import { Button } from '@/components/atoms/Button';
import { Header } from '@/components/atoms/Header';
import { ToniLogo } from '@/components/atoms/icons/ToniLogo';
import { Calibration } from '@/components/calibration/Calibration';
import { Card } from '@/components/organisms/Card';
import { TabBar } from '@/components/organisms/TabBar';

export default function Intro() {
  const [showCalibration, setShowCalibration] = useState(false);
  if (showCalibration) {
    return <Calibration isFromIntro />;
  }

  return (
    <SafeAreaView className="bg-background flex-1">
      <View className="items-center">
        <ToniLogo width={100} height={100} />
        <Header classes="pt-4">Willkommen</Header>
        <Text className="mx-auto mb-10 text-center font-atkinsonRegular text-2xl text-textColor">
          Wir freuen uns, dir deinen Alltag mit Toni zu erleichtern.
        </Text>
      </View>
      <Card>
        <TabBar />
      </Card>
      {/* <Card /> */}
      {/* <View className="mx-8 mb-3"> */}
      {/*  <Button */}
      {/*    width="full" */}
      {/*    buttonType="accent" */}
      {/*    onPress={() => { */}
      {/*      router.push('/auth/login'); */}
      {/*    }} */}
      {/*  > */}
      {/*    Login */}
      {/*  </Button> */}
      {/*  <Button */}
      {/*    width="full" */}
      {/*    buttonType="accent" */}
      {/*    onPress={() => router.push('/auth/register')} */}
      {/*  > */}
      {/*    Registrieren */}
      {/*  </Button> */}
      {/* </View> */}
      <Text className="mt-5">
        Du kannst Toni zu Beginn zwei Wochen kostenlos testen.
      </Text>
      <Button
        width="full"
        buttonType="primaryOutline"
        onPress={() => {
          setShowCalibration(true);
        }}
      >
        Probeabo starten
      </Button>
    </SafeAreaView>
  );
}
