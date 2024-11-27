import { router } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import React from 'react';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';

import { BigHeader } from '@/components/atoms/BigHeader';
import { Button } from '@/components/atoms/Button';
// import { getCalibrationValue } from '@/functions/getCalibrationValue';
import { useUserStore } from '@/store/useUserStore';

export default function ProfilePage() {
  const calibrationFactor = useUserStore((state) => state.calibrationFactor);
  const user = useUserStore((state) => state.user);
  const { resetCalibrationStore } = useUserStore((state) => state.actions);
  const logout = async () => {
    await SecureStore.deleteItemAsync('access_token');
    // const token = await SecureStore.getItemAsync('access_token');
    // console.log(token);
    resetCalibrationStore();
    // router.push('/');
  };

  console.log(user);

  return (
    <SafeAreaView className="flex-1 bg-background">
      <BigHeader classes="text-invertedPrimary">Profil</BigHeader>
      <Button
        onPress={() => resetCalibrationStore()}
        buttonType="accent"
        width="full"
      >
        Reset Store
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
              onPress={() => router.push('/intro/login')}
              buttonType="accent"
              width="full"
            >
              Login
            </Button>
            <Button
              onPress={() => router.push('/intro/registration')}
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
