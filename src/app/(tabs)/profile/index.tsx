import { router } from 'expo-router';
import React from 'react';
import { SafeAreaView, ScrollView, useColorScheme } from 'react-native';

import { Header } from '@/components/atoms/Header';
import { MenuButton } from '@/components/atoms/MenuButton';
import { StepLength } from '@/components/atoms/icons/StepLength';
import styling from '@/stylings';

export default function ProfilePage() {
  const colorscheme = useColorScheme();

  return (
    <SafeAreaView
      className={`flex-1 ${colorscheme === 'light' ? 'bg-background-light' : 'bg-background-dark'}`}
    >
      <ScrollView className="px-8 my-8">
        <Header
          classes={`${colorscheme === 'light' ? 'text-text-color-light' : 'text-background-light'}`}
        >
          Profil
        </Header>
        {/* <MenuButton onPress={() => router.push('/profile')} icon="person">
        Profil
        </MenuButton> */}
        <MenuButton
          onPress={() => {
            router.push('/profile/calibration/0');
          }}
          icon={
            <StepLength
              fill={
                colorscheme === 'light'
                  ? styling.colors['primary-color-dark']
                  : styling.colors['primary-color-light']
              }
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
