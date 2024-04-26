import React, { forwardRef } from 'react';
import {
  TextInput,
  useColorScheme,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { TextInputProps } from 'react-native/Libraries/Components/TextInput/TextInput';

import { Icon } from '@/components/atoms/Icon';
import styling from '@/stylings';

interface InputTextProps extends TextInputProps {
  onClickDelete: () => void;
}
export const InputText = forwardRef<TextInput, InputTextProps>(
  ({ className, onClickDelete, ...props }, ref) => {
    const colorscheme = useColorScheme();

    // TODO: add cross to delete value
    return (
      <>
        <Text className="font-atkinsonRegular mb-3">
          {props.accessibilityLabel}
        </Text>
        <View className="relative mb-2">
          <TextInput
            ref={ref}
            className={`border-2 rounded-[25px] p-4 !pr-12 ${colorscheme === 'light' ? 'border-primary-color-dark' : 'border-primary-color-light text-background-light'} ${className}`}
            {...props}
          />
          {props.value && (
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityHint="Eingabe löschen"
              onPress={onClickDelete}
              className="absolute top-2 right-3"
            >
              <Icon
                color={
                  colorscheme === 'light'
                    ? styling.colors['primary-color-dark']
                    : styling.colors['primary-color-light']
                }
                icon="cross"
                size={40}
              />
            </TouchableOpacity>
          )}
        </View>
      </>
    );
  }
);
