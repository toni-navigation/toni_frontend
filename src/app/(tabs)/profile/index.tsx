import { router } from 'expo-router';
import React, { useContext } from 'react';
import { SafeAreaView, ScrollView } from 'react-native';

import { themes } from '@/colors';
import { ThemeContext } from '@/components/ThemeProvider';
import { BigHeader } from '@/components/atoms/BigHeader';
import { MenuButton } from '@/components/atoms/MenuButton';
import { StepLength } from '@/components/atoms/icons/StepLength';

export default function ProfilePage() {
  const { theme } = useContext(ThemeContext);

  return (
    <SafeAreaView className="flex-1 bg-background">
      <BigHeader classes="text-invertedPrimary">Profil</BigHeader>
      <ScrollView className="px-8 my-8">
        {/* <MenuButton onPress={() => router.push('/profile')} icon="person">
        Profil
        </MenuButton> */}
        <MenuButton
          onPress={() => {
            router.push('/profile/calibration');
          }}
          icon={
            <StepLength
              fill={themes.external[`--${theme}-mode-primary`]}
              width={50}
              height={50}
            />
          }
        >
          Schrittlänge
        </MenuButton>
        {/* <MenuButton onPress={() => router.push('/profile')} icon="audio">
        Audio
        </MenuButton> */}
      </ScrollView>
    </SafeAreaView>
  );
}
