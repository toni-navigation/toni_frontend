import { useMutation } from '@tanstack/react-query';
import { router } from 'expo-router';
import React, { useRef, useState } from 'react';
import {
  Alert,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';

import { Button } from '@/components/atoms/Button';
import { InputText } from '@/components/atoms/InputText';
import { usersControllerCreateUserMutation } from '@/services/api-backend/@tanstack/react-query.gen';

interface ValidationError {
  property: string;
  message: string;
}

interface ValidationResponse {
  children: any[];
  constraints: Record<string, string>;
  property: string;
}
export function Registration() {
  // const { onLogin } = useAuthStore((state) => state.actions);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const extractConstraints = (
    validationData: ValidationResponse[]
  ): ValidationError[] =>
    validationData.flatMap((item) =>
      Object.values(item.constraints).map((message) => ({
        property: item.property,
        message,
      }))
    );

  const getErrorMessage = (error: any, field: string): string | null => {
    if (!error || ![400, 409].includes(error.statusCode)) return null;
    if (error.statusCode === 409) return error.message;

    return (
      extractConstraints(error.message).find(
        (errorProperty) => errorProperty.property === field
      )?.message || null
    );
  };

  const { mutate, error, isError, data, isPending } = useMutation({
    ...usersControllerCreateUserMutation(),
    onSuccess: async (successData) => {
      if (!successData) {
        Alert.alert('Registration Failed', 'Please try again');

        return;
      }
      // onLogin(successData.accessToken);
      router.replace('/home');
    },
  });
  const ref = useRef<TextInput>(null);

  const register = () => {
    mutate({
      body: {
        email,
        password,
        confirmPassword,
      },
    });
  };

  if (data) {
    return (
      <SafeAreaView>
        <Text>Success</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1">
      <ScrollView className="flex-1 mt-3">
        <InputText
          className="mb-2"
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
        {error &&
          (error.statusCode === 400 || error.statusCode === 409) &&
          getErrorMessage(error, 'email') && (
            <Text className="font-generalSansSemi text-xsmall text-accent mb-4">
              {getErrorMessage(error, 'email')}
            </Text>
          )}
        <InputText
          className="mb-2"
          accessibilityLabel="Passwort *"
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

        {error &&
          error.statusCode === 400 &&
          getErrorMessage(error, 'password') && (
            <Text className="font-generalSansSemi text-xsmall text-accent mb-4">
              {getErrorMessage(error, 'password')}
            </Text>
          )}
        <InputText
          className="mb-2"
          accessibilityLabel="Passwort bestätigen *"
          accessibilityHint="Pflichtfeld: Bestätige das Passwort"
          placeholder="Passwort bestätigen"
          secureTextEntry // Hides the text input for security
          inputMode="text"
          maxLength={300}
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.nativeEvent.text)}
          onClickDelete={() => {
            setConfirmPassword('');
            ref.current?.focus();
          }}
        />
        {error &&
          error.statusCode === 400 &&
          getErrorMessage(error, 'confirmPassword') && (
            <Text className="font-generalSansSemi text-xsmall text-accent mb-4">
              {getErrorMessage(error, 'confirmPassword')}
            </Text>
          )}
      </ScrollView>

      <View className="flex mb-3 items-center">
        <Button
          onPress={register}
          width="third"
          buttonType="primary"
          isLoading={isPending}
          disabled={!email || !password || !confirmPassword}
        >
          Registrieren
        </Button>
      </View>
    </SafeAreaView>
  );
}
