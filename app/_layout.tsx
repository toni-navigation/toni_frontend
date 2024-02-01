import { Link, Slot } from 'expo-router';
import { SafeAreaView, View } from 'react-native';
import React from 'react';

export default function HomeLayout() {
  return (
    <SafeAreaView>
      <View>
        <Link href="/">Startseite</Link>
        <Link href="/favorites">Favoriten Liste</Link>
        <Link href="/registration">Registrierung</Link>
        <Link href="/profile">Profil</Link>
      </View>
      <Slot />
    </SafeAreaView>
  );
}
