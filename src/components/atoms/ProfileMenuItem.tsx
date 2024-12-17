import React from 'react';
import { Text, View } from 'react-native';

interface ProfileMenuItemProps {
  children: React.ReactNode;
  label?: string;
  classes?: string;
  icon?: React.ReactNode;
}

export function ProfileMenuItem({
  children,
  label,
  icon,
  classes,
}: ProfileMenuItemProps) {
  return (
    <View
      className={`border-b-2 border-gray flex flex-row items-center py-5 ${classes}`}
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
