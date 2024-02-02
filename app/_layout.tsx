import { Link, Slot } from 'expo-router';
import { SafeAreaView, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { CurrentLocationProps } from '../types/Types';
import { getCurrentPosition } from '../src/functions/functions';

export default function HomeLayout() {
  const [currentLocation, setCurrentLocation] =
    useState<CurrentLocationProps | null>();

  useEffect(() => {
    (async () => {
      const position = await getCurrentPosition();
      setCurrentLocation(position);
    })();
  }, []);
  return (
    <SafeAreaView>
      <View>
        <Link href="/">Startseite</Link>
        <Link href="/favorites">Favoriten Liste</Link>
        <Link href="/registration">Registrierung</Link>
        <Link href="/profile">Profil</Link>
      </View>
      <View>
        <Text>CurrentLocation: </Text>
        {currentLocation && (
          <Text>
            {currentLocation.coords.latitude},{' '}
            {currentLocation.coords.longitude}
          </Text>
        )}
      </View>
      <Slot />
    </SafeAreaView>
  );
}
