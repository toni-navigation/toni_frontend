import { router } from 'expo-router';
import React, { useRef, useState } from 'react';
import { SafeAreaView, ScrollView, TextInput, Text, View } from 'react-native';

import { Button } from '@/components/atoms/Button';
import { Header } from '@/components/atoms/Header';
import { InputText } from '@/components/atoms/InputText';

export default function RegistrationPage() {
  const [registrationStep, setRegistrationStep] = useState(0);
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [passwordReValue, setPasswordReValue] = useState('');

  const ref = useRef<TextInput>(null);

  if (registrationStep === 0) {
    return (
      <SafeAreaView className="flex-1 bg-background">
        {/* eslint-disable-next-line react/jsx-no-undef */}
        <ScrollView className="px-8 my-8" keyboardShouldPersistTaps="always">
          <Header classes="text-textColor">Registrieren</Header>

          <InputText
            className="mb-4"
            accessibilityLabel="Email Adresse *"
            accessibilityHint="Pflichtfeld: Geben Sie ihre Email Adresse ein"
            placeholder="Email Adresse eingeben"
            inputMode="email"
            maxLength={300}
            value={emailValue}
            onChange={(event) => setEmailValue(event.nativeEvent.text)}
            onClickDelete={() => {
              setEmailValue('');
              ref.current?.focus();
            }}
          />
          <InputText
            className="mb-4"
            accessibilityLabel="Password *"
            accessibilityHint="Pflichtfeld: Geben Sie eine Passwort ein"
            placeholder="Passwort eingeben"
            inputMode="text"
            maxLength={300}
            value={passwordValue}
            onChange={(event) => setPasswordValue(event.nativeEvent.text)}
            onClickDelete={() => {
              setPasswordValue('');
              ref.current?.focus();
            }}
          />
          <InputText
            className="mb-4"
            accessibilityLabel="Password wiederholen*"
            accessibilityHint="Pflichtfeld: Geben Sie eine Passwort erneut ein"
            placeholder="Passwort wiederholen"
            inputMode="text"
            maxLength={300}
            value={passwordReValue}
            onChange={(event) => setPasswordReValue(event.nativeEvent.text)}
            onClickDelete={() => {
              setPasswordReValue('');
              ref.current?.focus();
            }}
          />
        </ScrollView>
        <View className="mx-8 mb-8">
          <Button
            width="full"
            onPress={() => setRegistrationStep(1)}
            buttonType="primary"
          >
            Weiter
          </Button>
        </View>
      </SafeAreaView>
    );
  }

  if (registrationStep === 1) {
    return (
      <SafeAreaView className="flex-1 bg-background">
        {/* eslint-disable-next-line react/jsx-no-undef */}
        <ScrollView className="px-8 my-8">
          <Header classes="text-textColor">Fast Geschafft!</Header>
          <Text className="font-atkinsonRegular text-2xl text-textColor">
            Bitte bestätige deine Email Adresse. {'\n'}
            {'\n'}
            Falls du keine Email erhalten hast, überprüfe bitte deinen
            Spam-Ordner.
          </Text>
        </ScrollView>
        <View className="mx-8 mb-8">
          <Button
            width="full"
            onPress={() => setRegistrationStep(1)}
            buttonType="primaryOutline"
          >
            Nochmal senden
          </Button>
          <Button
            width="full"
            buttonType="primary"
            onPress={() => {
              router.push('../calibration/0?fromIntro=true');
            }}
          >
            Fertig
          </Button>
        </View>
      </SafeAreaView>
    );
  }
}
