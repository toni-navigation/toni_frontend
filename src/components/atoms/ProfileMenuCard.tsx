import React, { useContext } from 'react';
import { Text, View } from 'react-native';

import { themes } from '@/colors';
import { ThemeContext } from '@/components/ThemeProvider';
import { IconButton } from '@/components/atoms/IconButton';
import { ToniEdit } from '@/components/atoms/icons/ToniEdit';

interface ProfileMenuCardProps {
  header: string;
  classes?: string;
  children: React.ReactNode;
  onPress?: () => void;
  editButton?: boolean;
}

export function ProfileMenuCard({
  header,
  classes,
  children,
  onPress,
  editButton,
}: ProfileMenuCardProps) {
  const { theme } = useContext(ThemeContext);

  return (
    <View
      className={`rounded-[25px] mt-8 bg-background border-gray border-2 shadow-md ${classes}`}
    >
      <View className="p-6">
        <View className="flex flex-row justify-between items-center">
          <Text className="font-generalSansSemi text-primary text-medium">
            {header}
          </Text>
          {editButton && onPress && (
            <IconButton
              icon={
                <ToniEdit
                  height={30}
                  width={30}
                  stroke={themes.external[`--${theme}-mode-icon-button`]}
                  strokeWidth={4}
                />
              }
              iconName="Bearbeiten"
              onPress={onPress}
              buttonType="icon"
            />
          )}
        </View>
        {children}
      </View>
    </View>
  );
}
