import React, { forwardRef, useContext } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { TextInputProps } from 'react-native/Libraries/Components/TextInput/TextInput';

import { themes } from '@/colors';
import { ThemeContext } from '@/components/ThemeProvider';
import { ToniClose } from '@/components/atoms/icons/ToniClose';

interface InputTextProps extends TextInputProps {
  onClickDelete?: () => void;
}

export const InputText = forwardRef<TextInput, InputTextProps>(
  ({ className, onClickDelete, ...props }, ref) => {
    const { theme } = useContext(ThemeContext);

    return (
      <View className="mb-2">
        <Text className="font-atkinsonRegular text-xsmall mx-3 mb-2 text-primary">
          {props.accessibilityLabel}
        </Text>
        <View className="relative">
          <TextInput
            ref={ref}
            testID="TextInput"
            className={`bg-background font-atkinsonRegular h-12 text border-2 border-primary rounded-[25px] text-textColor p-3 !pr-12' ${className}`}
            {...props}
            placeholderTextColor={themes.external[`--${theme}-mode-text-color`]}
          />
          {props.value && (
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityHint="Eingabe löschen"
              onPress={onClickDelete}
              className="absolute right-4 top-1/2 transform -translate-y-1/2"
              testID="DeleteButton"
            >
              <ToniClose
                stroke={themes.external[`--${theme}-mode-primary`]}
                width={16}
                height={16}
                strokeWidth={5}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  }
);
