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
      <>
        <Text className="font-atkinsonRegular text-lg mb-3 text-textColor">
          {props.accessibilityLabel}
        </Text>
        <View className="relative mb-2">
          <TextInput
            ref={ref}
            testID="TextInput"
            className={`font-atkinsonRegular text border-2 border-primary rounded-[25px] text-textColor p-4 !pr-12' ${className}`}
            {...props}
          />
          {props.value && (
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityHint="Eingabe löschen"
              onPress={onClickDelete}
              className={` absolute top-2 right-3`}
              testID="DeleteButton"
            >
              <ToniClose
                stroke={themes.external[`--${theme}-mode-primary`]}
                width={32}
                height={32}
                strokeWidth={3}
              />
            </TouchableOpacity>
          )}
        </View>
      </>
    );
  }
);
