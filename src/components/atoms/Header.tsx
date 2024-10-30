import React from 'react';
import { Text } from 'react-native';

interface HeaderProps {
  classes?: string;
  children: React.ReactNode;
}

export function Header({ classes = '', children }: HeaderProps) {
  return (
    <Text
      testID="HeaderText"
      className={`text-4xl font-generalSansSemi ${classes}`}
    >
      {children}
    </Text>
  );
}
