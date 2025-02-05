import { useMutation } from '@tanstack/react-query';
import { router } from 'expo-router';
import React, { useRef, useState } from 'react';
import { SafeAreaView, ScrollView, Text, TextInput, View } from 'react-native';

import { Button } from '@/components/atoms/Button';
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
  const [validateInput, setValidateInput] = useState(true);

  const {
    error: loginError,
    isPending,
    mutate,
  } = useMutation({
    ...authenticationControllerLoginMutation(),
    onSuccess: async (successData) => {
      try {
        await saveToken(TOKEN, successData.accessToken);
        addToken(successData.accessToken);
        router.replace('/home');
      } catch (error) {
        console.error(error);
      }
    },
    mutationKey: ['login'],
  });
  const typeError: any = loginError;
  const ref = useRef<TextInput>(null);

  const login = () => {
    mutate({
      body: {
        email,
        password,
      },
    });
  };

  const onSubmit = () => {
    if (!email || !password || password.length < 8 || !email.includes('@')) {
      setValidateInput(false);

      return;
    }
    login();
  };

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
          onChange={(event) => {
            setEmail(event.nativeEvent.text);
          }}
          onClickDelete={() => {
            setEmail('');
            ref.current?.focus();
          }}
        />
        {!validateInput && !email.includes('@') && (
          <Text className="font-generalSansSemi text-xsmall text-accent mb-4">
            Email muss eine gültige Email Adresse sein
          </Text>
        )}
        {typeError && typeError.statusCode === 404 && (
          <Text className="font-generalSansSemi text-xsmall text-accent mb-4">
            {typeError.message}
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
          onChange={(event) => {
            setRequiredFields(false);
            setPassword(event.nativeEvent.text);
          }}
          onClickDelete={() => {
            setPassword('');
            ref.current?.focus();
          }}
        />
        {!validateInput && password.length < 8 && (
          <Text className="font-generalSansSemi text-xsmall text-accent mb-4">
            Passwort muss mindestens 8 Zeichen lang sein
          </Text>
        )}
        {typeError && typeError.statusCode === 500 && (
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
          onPress={onSubmit}
          buttonType="primary"
          disabled={!email || !password}
        >
          Login
        </Button>
      </View>
    </SafeAreaView>
  );
}
