import { useMutation } from '@tanstack/react-query';
import { router } from 'expo-router';
import React, { useRef, useState } from 'react';
import { SafeAreaView, TextInput, View } from 'react-native';

import { Button } from '@/components/atoms/Button';
import { Header } from '@/components/atoms/Header';
import { InputText } from '@/components/atoms/InputText';
import { loginUser } from '@/functions/loginUser';
import { LoginUserDto } from '@/services/api-backend';
import { useAuthStore } from '@/store/useAuthStore';
import { useUserStore } from '@/store/useUserStore';

export function Login() {
  const { onLogin } = useAuthStore((state) => state.actions);
  const { addUser } = useUserStore((state) => state.actions);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { error, isPending, mutate, data } = useMutation({
    mutationFn: (user: LoginUserDto) => loginUser(user),
    onSuccess: (successData) => {
      if (!successData) {
        console.error('Kein Nutzer mit dieser E-Mail Adresse gefunden.');

        return;
      }
      onLogin(successData.accessToken);
      addUser(successData.user);
      router.replace('/home');
    },
  });
  const ref = useRef<TextInput>(null);

  const login = () => {
    if (!email || !password) {
      console.error('All fields are required!');

      return;
    }

    mutate({
      email,
      password,
    });
  };

  if (data) {
    return (
      <SafeAreaView className="flex-1 bg-background">
        <Header classes="text-textColor">Success</Header>
      </SafeAreaView>
    );
  }

  return (
    <View>
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
      {error && <Header classes="text-red-500">{error.message}</Header>}
      <View className="mx-8 mb-8">
        <Button
          width="full"
          isLoading={isPending}
          onPress={login}
          buttonType="primary"
        >
          Login
        </Button>
      </View>
    </View>
  );
}
