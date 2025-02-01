import { useMutation } from '@tanstack/react-query';
import { router } from 'expo-router';
import React, { useRef, useState } from 'react';
import { SafeAreaView, ScrollView, TextInput, View } from 'react-native';

import { Button } from '@/components/atoms/Button';
import { Header } from '@/components/atoms/Header';
import { InputText } from '@/components/atoms/InputText';
import { authenticationControllerLoginMutation } from '@/services/api-backend/@tanstack/react-query.gen';
import { TOKEN } from '@/services/client';
import { saveToken } from '@/store/secureStore';
import { useAuthStore } from '@/store/useAuthStore';
import { useUserStore } from '@/store/useUserStore';

export function Login() {
  const { addUser, addCalibration } = useUserStore((state) => state.actions);
  const { addToken } = useAuthStore((state) => state.actions);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { error, isPending, mutate, data } = useMutation({
    ...authenticationControllerLoginMutation(),
    onSuccess: async (successData) => {
      if (!successData) {
        console.error(
          'Kein Nutzer npm run mit dieser E-Mail Adresse gefunden.'
        );

        return;
      }
      try {
        await saveToken(TOKEN, successData.accessToken);
        addUser(successData.user);
        addToken(successData.accessToken);
        router.replace('/home');
      } catch (error) {
        console.error(error);
      }
    },
    onError: (error) => {
      console.error(error.message);
    },
  });
  const ref = useRef<TextInput>(null);

  const login = () => {
    if (!email || !password) {
      console.error('All fields are required!');

      return;
    }
    mutate({
      body: {
        email,
        password,
      },
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
      <SafeAreaView className={"flex-1"}>
    <ScrollView className={"flex-1 mt-3"}>
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
    </ScrollView>

        <View className="flex mb-3 items-center">
        <Button
          width="third"
          isLoading={isPending}
          onPress={login}
          buttonType="primary"
        >
          Login
        </Button>
      </View>
      </SafeAreaView>
  );
}
