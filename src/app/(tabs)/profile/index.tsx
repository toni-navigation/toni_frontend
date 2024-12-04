import { router } from 'expo-router';
import React from 'react';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';

import { BigHeader } from '@/components/atoms/BigHeader';
import { Button } from '@/components/atoms/Button';
// import { getCalibrationValue } from '@/functions/getCalibrationValue';
import { useAuthStore } from '@/store/useAuthStore';
import { useUserStore } from '@/store/useUserStore';

export default function ProfilePage() {
  const calibrationFactor = useUserStore((state) => state.calibrationFactor);
  const user = useUserStore((state) => state.user);
  const { resetUserStore } = useUserStore((state) => state.actions);
  const { onLogout, resetAuthStore } = useAuthStore((state) => state.actions);
  const logout = () => {
    onLogout();
    resetAuthStore();
    resetUserStore();
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <BigHeader classes="text-invertedPrimary">Profil</BigHeader>
      <Button
        onPress={() => {
          resetUserStore();
        }}
        buttonType="accent"
        width="full"
      >
        Reset Auth
      </Button>
      <ScrollView className="px-8 my-8">
        {calibrationFactor && (
          <Text className="font-atkinsonRegular text-2xl text-textColor">
            Schrittlänge: {calibrationFactor} m
          </Text>
        )}
        <Button
          width="full"
          onPress={() => {
            router.push('/profile/calibration');
          }}
          buttonType="primaryOutline"
        >
          Kalibrieren
        </Button>
        {!user && (
          <View>
            <Button
              onPress={() => router.push('/auth/login')}
              buttonType="accent"
              width="full"
            >
              Login
            </Button>
            <Button
              onPress={() => router.push('/auth/register')}
              buttonType="accent"
              width="full"
            >
              Register
            </Button>
          </View>
        )}
        {user && (
          <Button onPress={logout} buttonType="accent" width="full">
            Logout
          </Button>
        )}
        <View>
          {user?.email && (
            <Text className="font-atkinsonRegular text-2xl text-textColor">
              E-Mail: {user.email}
            </Text>
          )}
          {user?.firstname && (
            <Text className="font-atkinsonRegular text-2xl text-textColor">
              firstname: {user.firstname}
            </Text>
          )}
          {user?.lastname && (
            <Text className="font-atkinsonRegular text-2xl text-textColor">
              lastname: {user.lastname}
            </Text>
          )}
        </View>

        {/* <FavoritesCard */}
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
        {/* </FavoritesCard> */}
        {/* <FavoritesCard */}
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
        {/* </FavoritesCard> */}
        {/* <FavoritesCard onPress={() => router.push('/profile')} icon="audio">
          Audio
          </FavoritesCard> */}
      </ScrollView>
    </SafeAreaView>
  );
}
