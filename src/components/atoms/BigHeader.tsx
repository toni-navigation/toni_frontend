import React from 'react';
import { Text, View } from 'react-native';

interface HeaderProps {
  classes?: string;
  children: React.ReactNode;
}

export function BigHeader({ classes = '', children }: HeaderProps) {
  return (
    <View className="bg-primary mt-8 rounded-ee-[35px] rounded-se-[35px] px-8 self-start shadow-lg">
      <View className="h-16 flex-row items-center shadow-[inset_1_1px_1px_rgba(0,0,0,0.6)]">
        <Text
          testID="BigHeaderText"
          className={`text-4xl font-generalSansSemi ${classes}`}
        >
          {children}
        </Text>
      </View>
    </View>
  );
}
