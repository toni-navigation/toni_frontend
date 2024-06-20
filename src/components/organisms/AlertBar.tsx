import * as Speech from 'expo-speech';
import React, { useEffect } from 'react';
import { Text, View } from 'react-native';

interface AlertBarProps {
  text: string;
}

export function AlertBar({ text }: AlertBarProps) {
  useEffect(() => {
    Speech.speak(text, {
      language: 'de',
    });
  }, [text]);

  return (
    <View
      accessibilityLabel="Alert Bar"
      accessibilityRole="alert"
      accessibilityHint={text}
      className="bg-accent flex flex-row items-center justify-center p-2"
    >
      {/* <Icon color="white" icon="cross" /> */}
      <Text className="mx-auto text-center font-atkinsonRegular text-xl text-white">
        {text}
      </Text>
    </View>
  );
}
