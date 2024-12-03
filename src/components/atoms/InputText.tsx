import React, { forwardRef, useContext } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { TextInputProps } from 'react-native/Libraries/Components/TextInput/TextInput';

import { themes } from '@/colors';
import { ThemeContext } from '@/components/ThemeProvider';
import { Cross } from '@/components/atoms/icons/Cross';

interface InputTextProps extends TextInputProps {
  onClickDelete?: () => void;
}

export const InputText = forwardRef<TextInput, InputTextProps>(
  ({ className, onClickDelete, ...props }, ref) => {
    const { theme } = useContext(ThemeContext);

    return (
      <View className="mb-2">
        <Text className="font-atkinsonRegular text-lg mb-1 text-textColor">
          {props.accessibilityLabel}
        </Text>
        <View className="relative">
          <TextInput
            ref={ref}
            testID="TextInput"
            className={`font-atkinsonRegular text border-2 border-primary rounded-[25px] text-textColor p-2 !pr-12' ${className}`}
            {...props}
          />
          {props.value && (
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityHint="Eingabe löschen"
              onPress={onClickDelete}
              className="absolute right-0 top-0"
              testID="DeleteButton"
            >
              <Cross
                fill={themes.external[`--${theme}-mode-primary`]}
                width={40}
                height={40}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  }
);
