import { useMutation } from '@tanstack/react-query';
import { router } from 'expo-router';
import React, { useRef, useState } from 'react';
import { SafeAreaView, ScrollView, Text, TextInput, View } from 'react-native';

import { Button } from '@/components/atoms/Button';
import { Header } from '@/components/atoms/Header';
import { InputText } from '@/components/atoms/InputText';
import { authenticationControllerLoginMutation } from '@/services/api-backend/@tanstack/react-query.gen';
import { TOKEN } from '@/services/client';
import { saveToken } from '@/store/secureStore';
import { useAuthStore } from '@/store/useAuthStore';

export function Login() {
  // const { addUser, addCalibration } = useUserStore((state) => state.actions);
  const { addToken } = useAuthStore((state) => state.actions);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [requiredFields, setRequiredFields] = useState(false);

  const {
    error: loginError,
    isPending,
    mutate,
    data,
  } = useMutation({
    ...authenticationControllerLoginMutation(),
    onSuccess: async (successData) => {
      if (!successData) {
        console.error('Kein Nutzer mit dieser E-Mail Adresse gefunden.');

        return;
      }
      try {
        await saveToken(TOKEN, successData.accessToken);
        addToken(successData.accessToken);
        router.replace('/home');
      } catch (error) {
        console.error(error);
      }
    },
  });
  const ref = useRef<TextInput>(null);

  const login = () => {
    setRequiredFields(false);
    if (!email || !password) {
      setRequiredFields(true);

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
    <SafeAreaView className="flex-1">
      <ScrollView className="flex-1 mt-3">
        <InputText
          className=""
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
        {loginError && loginError.statusCode === 404 && (
          <Text className="font-generalSansSemi text-xsmall text-accent mb-4">
            Kein Nutzer mit dieser Email gefunden
          </Text>
        )}
        <InputText
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
        {loginError && loginError.statusCode === 500 && (
          <Text className="font-generalSansSemi text-xsmall text-accent">
            Falsches Password
          </Text>
        )}
      </ScrollView>

      <View className="flex mb-3 items-center">
        {requiredFields && (
          <Text className="mb-5 text-small font-generalSansSemi text-accent">
            Bitte alle Felder ausfüllen!
          </Text>
        )}
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
