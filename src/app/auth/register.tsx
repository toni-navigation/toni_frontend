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
import { Header } from '@/components/atoms/Header';
import { InputText } from '@/components/atoms/InputText';
import { registerUser } from '@/functions/registerUser';
import { CreateUserDto } from '@/services/api-backend';
import { useAuthStore } from '@/store/useAuthStore';
import { useUserStore } from '@/store/useUserStore';

export default function Register() {
  const { onLogin } = useAuthStore((state) => state.actions);
  const { addUser } = useUserStore((state) => state.actions);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');

  const { mutate, isPending, error, data } = useMutation({
    mutationFn: (user: CreateUserDto) => registerUser(user),
    onSuccess: (successData) => {
      if (!successData) {
        Alert.alert('Registration Failed', 'Please try again');

        return;
      }
      onLogin(successData.accessToken);
      addUser(successData.user);
      router.replace('/home');
    },
  });
  const ref = useRef<TextInput>(null);

  const register = () => {
    if (!email || !password || !firstname || !lastname) {
      console.error('All fields are required!');

      return;
    }

    mutate({
      email,
      password,
      firstname,
      lastname,
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
        {error && <Text className="text-red-500">{error.message}</Text>}
      </ScrollView>
      <View className="mx-8 mb-8">
        <Button
          width="full"
          onPress={register}
          buttonType="primary"
          isLoading={isPending}
        >
          Registrieren
        </Button>
      </View>
    </SafeAreaView>
  );
}
