import React from 'react';
import { Text, View } from 'react-native';

interface ProfileMenuItemProps {
  children: React.ReactNode;
  label?: string;
  classes?: string;
  icon?: React.ReactNode;
  isLast?: boolean;
}

export function ProfileMenuItem({
  children,
  label,
  icon,
  classes,
  isLast,
}: ProfileMenuItemProps) {
  return (
    <View
      className={`flex flex-row items-center pt-5 ${isLast ? '' : 'border-b-2 border-gray pb-5'} ${classes}`}
    >
      {icon && icon}
      <View className="ps-5">
        {label && (
          <Text className="font-atkinsonRegular text-textColor opacity-50">
            {label}
          </Text>
        )}
        <Text className="font-atkinsonRegular text-small text-textColor">
          {children && children}
        </Text>
      </View>
    </View>
  );
}
