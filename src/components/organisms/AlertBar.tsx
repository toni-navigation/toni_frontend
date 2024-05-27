import * as Speech from 'expo-speech';
import React, { useEffect } from 'react';
import { Text, View } from 'react-native';

import { Icon } from '@/components/atoms/Icon';

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
    <View>
      <Icon color="white" icon="cross" />
      <Text>{text}</Text>
    </View>
  );
}
