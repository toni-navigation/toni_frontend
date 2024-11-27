import { useMutation } from '@tanstack/react-query';
import { router } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import React, { useRef, useState } from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';

import { Button } from '@/components/atoms/Button';
import { Header } from '@/components/atoms/Header';
import { InputText } from '@/components/atoms/InputText';
import {
  CreateUserDto,
  usersControllerCreateUser,
} from '@/services/api-backend';
import { useUserStore } from '@/store/useUserStore';

export const BASE_URL = 'http://localhost:3000';
export default function Registration() {
  const { addUser } = useUserStore((state) => state.actions);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  async function registerUser(data: CreateUserDto) {
    const response = await usersControllerCreateUser({
      body: data,
      baseUrl: BASE_URL,
    });

    return response.data;
  }
  const { error, isPending, mutateAsync, data } = useMutation({
    mutationKey: ['register'],
    mutationFn: (user: CreateUserDto) => registerUser(user),
  });
  const ref = useRef<TextInput>(null);

  async function register() {
    if (!email || !password || !firstname || !lastname) {
      console.error('All fields are required!');

      return;
    }

    const response = await mutateAsync({
      email,
      password,
      firstname,
      lastname,
    });

    if (response) {
      try {
        await SecureStore.setItemAsync('access_token', response.accessToken);
        addUser(response.user);
        router.replace('/home');
      } catch (secureStoreError) {
        console.error(secureStoreError);
      }
    }
  }

  if (isPending) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    console.error(error);
  }

  if (data) {
    return (
      <SafeAreaView>
        <Text>Success</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView className="px-8 my-8" keyboardShouldPersistTaps="always">
        <Header classes="text-textColor">Registrieren</Header>
        <InputText
          className="mb-4"
          accessibilityLabel="Vorname *"
          accessibilityHint="Pflichtfeld: Geben Sie ihre Email Adresse ein"
          placeholder="Vorname eingeben"
          inputMode="text"
          maxLength={300}
          value={firstname}
          onChange={(event) => setFirstName(event.nativeEvent.text)}
          onClickDelete={() => {
            setFirstName('');
            ref.current?.focus();
          }}
        />
        <InputText
          className="mb-4"
          accessibilityLabel="Nachname *"
          accessibilityHint="Pflichtfeld: Geben Sie ihren Nachnamen ein"
          placeholder="Nachname eingeben"
          inputMode="text"
          maxLength={300}
          value={lastname}
          onChange={(event) => setLastName(event.nativeEvent.text)}
          onClickDelete={() => {
            setLastName('');
            ref.current?.focus();
          }}
        />
        <InputText
          className="mb-4"
          accessibilityLabel="Email Adresse *"
          accessibilityHint="Pflichtfeld: Geben Sie ihre Email Adresse ein"
          placeholder="Email Adresse eingeben"
          inputMode="email"
          maxLength={300}
          value={email}
          onChange={(event) => setEmail(event.nativeEvent.text)}
          onClickDelete={() => {
            setEmail('');
            ref.current?.focus();
          }}
        />
        <InputText
          className="mb-4"
          accessibilityLabel="Password *"
          accessibilityHint="Pflichtfeld: Geben Sie eine Passwort ein"
          placeholder="Passwort eingeben"
          secureTextEntry // Hides the text input for security
          inputMode="text"
          maxLength={300}
          value={password}
          onChange={(event) => setPassword(event.nativeEvent.text)}
          onClickDelete={() => {
            setPassword('');
            ref.current?.focus();
          }}
        />
      </ScrollView>
      <View className="mx-8 mb-8">
        <Button width="full" onPress={() => register()} buttonType="primary">
          Registrieren
        </Button>
      </View>
    </SafeAreaView>
  );
}
