import { useMutation } from '@tanstack/react-query';
import { router } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import React, { useRef, useState } from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  TextInput,
  View,
} from 'react-native';

import { BASE_URL } from '@/app/intro/registration';
import { Button } from '@/components/atoms/Button';
import { Header } from '@/components/atoms/Header';
import { InputText } from '@/components/atoms/InputText';
import {
  authenticationControllerLogin,
  LoginUserDto,
} from '@/services/api-backend';
import { useUserStore } from '@/store/useUserStore';

export default function Login() {
  const { addUser } = useUserStore((state) => state.actions);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  async function loginUser(data: LoginUserDto) {
    try {
      const response = await authenticationControllerLogin({
        body: data,
        baseUrl: BASE_URL,
      });

      return response.data;
    } catch (error) {
      throw new Error('Fehler');
    }
  }
  const { error, isPending, mutateAsync, data } = useMutation({
    mutationKey: ['login'],
    mutationFn: async (user: LoginUserDto) => loginUser(user),
  });
  const ref = useRef<TextInput>(null);

  async function login() {
    if (!email || !password) {
      console.error('All fields are required!');

      return;
    }

    const response = await mutateAsync({
      email,
      password,
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
    return (
      <SafeAreaView className="flex-1 bg-background">
        <Header classes="text-textColor">Error</Header>
      </SafeAreaView>
    );
  }

  if (data) {
    return (
      <SafeAreaView className="flex-1 bg-background">
        <Header classes="text-textColor">Success</Header>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView className="px-8 my-8" keyboardShouldPersistTaps="always">
        <Header classes="text-textColor">Login</Header>

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
        <Button width="full" onPress={() => login()} buttonType="primary">
          Login
        </Button>
      </View>
    </SafeAreaView>
  );
}
