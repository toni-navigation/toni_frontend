import React from 'react';
import { Text, useColorScheme, View } from 'react-native';

import * as icons from '@/assets/icons/icons';
import { Icon } from '@/components/atoms/Icon';
import stylings from '@/stylings';

export type IconByKey = keyof typeof icons;

interface CardProps {
  iconKey?: IconByKey;
  children: React.ReactNode;
}

// TODO: Add accessibilityLabel and accessibilityRole
export function Card({ iconKey, children }: CardProps) {
  const colorscheme = useColorScheme();

  return (
    <View className="flex-1 justify-center items-center">
      {iconKey && (
        <Icon
          color={`${colorscheme === 'light' ? stylings.colors['primary-color-dark'] : stylings.colors['primary-color-light']}`}
          icon={iconKey}
          size={200}
        />
      )}

      <Text
        className={`font-atkinsonRegular text-center ${colorscheme === 'light' ? 'text-primary-color-dark' : 'text-primary-color-light'}`}
      >
        {children}
      </Text>
    </View>
  );
}
