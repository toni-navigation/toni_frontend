import React from 'react';
import { Text, View } from 'react-native';

import * as icons from '@/assets/icons/icons';
import { Icon } from '@/components/atoms/Icon';
import styling from '@/stylings';

export type IconByKey = keyof typeof icons;

interface CardProps {
  iconKey?: IconByKey;
  children: React.ReactNode;
}

// TODO: Add accessibilityLabel and accessibilityRole
export function Card({ iconKey, children }: CardProps) {
  return (
    <View className="flex-1 justify-center items-center">
      {iconKey && (
        <Icon
          color={styling.colors['primary-color-light']}
          icon={iconKey}
          size={200}
        />
      )}

      <Text className="text-primary-color-light font-atkinsonRegular">
        {children}
      </Text>
    </View>
  );
}
