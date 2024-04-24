import React from 'react';
import { Text } from 'react-native';

interface HeaderProps {
  children: React.ReactNode;
}

export function Header({ children }: HeaderProps) {
  return <Text className="text-4xl font-generalSansSemi h-24">{children}</Text>;
}
