import React from 'react';
import { Text } from 'react-native';

interface HeaderProps {
  classes?: string;
  children: React.ReactNode;
}

export function Header({ classes, children }: HeaderProps) {
  return (
    <Text className={`text-4xl font-generalSansSemi h-24 ${classes}`}>
      {children}
    </Text>
  );
}
