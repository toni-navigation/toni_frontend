import React from 'react';
import { Text, TouchableOpacity, useColorScheme, View } from 'react-native';

import { Icon, IconByKey } from '@/components/atoms/Icon';
import styling from '@/stylings';

interface MenuButtonProps {
  children: React.ReactNode;
  onPress: () => void;
  icon: IconByKey;
}

export function MenuButton({ children, onPress, icon }: MenuButtonProps) {
  const colorscheme = useColorScheme();

  if (onPress) {
    return (
      <TouchableOpacity
        accessibilityRole="button"
        accessibilityHint=""
        accessibilityLabel={`${children} `}
        onPress={onPress}
        className={` flex flex-row items-center
            border-[3px] rounded-[25px] h-36 mb-5 py-3 px-2 ${colorscheme === 'light' ? 'border-primary-color-dark' : 'border-primary-color-light'}`}
      >
        <View className="pl-2">
          <Icon
            color={
              colorscheme === 'light'
                ? styling.colors['primary-color-dark']
                : styling.colors['primary-color-light']
            }
            icon={icon}
            size={50}
          />
        </View>
        <Text
          className={` font-generalSansSemi text-2xl pl-4
            ${colorscheme === 'light' ? 'text-primary-color-dark' : 'text-primary-color-light'}`}
        >
          {children}
        </Text>
      </TouchableOpacity>
    );
  }
}
