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
  ({ className, ...props }, ref) => {
    const colorscheme = useColorScheme();

    // TODO: add cross to delete value
    return (
      <View className="relative">
        <Text className="font-atkinsonRegular mb-3">
          {props.accessibilityLabel}
        </Text>
        <TextInput
          ref={ref}
          className={`border-2 rounded-[25px] p-4 !pr-12 mb-4 ${colorscheme === 'light' ? 'border-primary-color-dark' : 'border-primary-color-light text-background-light'} ${className}`}
          {...props}
        />
        {props.value && (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityHint="Eingabe löschen"
            onPress={props.onClickDelete}
            className="absolute bottom-6 right-3"
          >
            <Icon
              color={styling.colors['primary-color-dark']}
              icon="cross"
              size={40}
            />
          </TouchableOpacity>
        )}
      </View>
    );
  }
);
