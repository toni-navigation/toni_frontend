import React from 'react';
import { Text, View } from 'react-native';

import * as icons from '@/assets/icons/icons';
import { Icon } from '@/components/atoms/Icon';
import styling from '@/stylings';

export type IconByKey = keyof typeof icons;

interface CardProps {
  directionType?: number;
  iconKey?: IconByKey;
  children: React.ReactNode;
}

function mapDirectionTypeToIcon(directionType: number): IconByKey {
  switch (directionType) {
    case 9:
      return 'arrowRight';
    case 10:
      return 'arrowRight';
    case 11:
      return 'arrowRight';
    case 14:
      return 'arrowLeft';
    case 15:
      return 'arrowLeft';
    case 16:
      return 'arrowLeft';
    default:
      return 'arrowStraight';
  }
}

// TODO: Add accessibilityLabel and accessibilityRole
export function Card({ directionType, iconKey, children }: CardProps) {
  return (
    <View className="flex-1 justify-center items-center">
      {directionType && (
        <Icon
          color={styling.colors['primary-color-light']}
          icon={mapDirectionTypeToIcon(directionType)}
          size={200}
        />
      )}
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
