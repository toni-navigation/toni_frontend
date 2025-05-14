import React, { useState } from 'react';
import { SafeAreaView, Text, View } from 'react-native';

import { Button } from '@/components/atoms/Button';
import { Header } from '@/components/atoms/Header';
import { ToniLogo } from '@/components/atoms/icons/ToniLogo';
import { Calibration } from '@/components/calibration/Calibration';
import { Card } from '@/components/organisms/Card';
import { Login } from '@/components/organisms/Login';
import { Registration } from '@/components/organisms/Registration';
import { TabBar } from '@/components/organisms/TabBar';

export default function Intro() {
  const [showCalibration, setShowCalibration] = useState(false);
  if (showCalibration) {
    return <Calibration isFromIntro />;
  }

  return (
    <SafeAreaView className="bg-background flex-1">
      <View className="flex-1 mx-5">
        <View className="items-center pt-4">
          <ToniLogo width={80} height={80} />
          <Header classes="pt-4">Willkommen</Header>
          <Text className="mx-auto mt-5 mb-10 text-center font-atkinsonRegular text-small text-textColor">
            Wir freuen uns, dir deinen Alltag mit Hearow zu erleichtern.
          </Text>
        </View>
        <Card>
          <TabBar
            firstTabButtonText="Registrierung"
            secondTabButtonText="Login"
          >
            <Registration key="1" />
            <Login key="2" />
          </TabBar>
        </Card>

        <View className="mt-10 mb-5">
          <Text className="mb-2 text-xsmall mx-auto text-textColor">
            Du kannst Hearow zu Beginn zwei Wochen kostenlos testen.
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
        </View>
      </View>
    </SafeAreaView>
  );
}
