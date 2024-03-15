import React, { forwardRef } from 'react';
import { TextInput, useColorScheme, View } from 'react-native';
import { TextInputProps } from 'react-native/Libraries/Components/TextInput/TextInput';

export const InputText = forwardRef<TextInput, TextInputProps>(
  ({ className, ...props }, ref) => {
    const colorscheme = useColorScheme();

    return (
      <View>
        <TextInput
          ref={ref}
          className={`border-2 rounded-full w-full p-4 mb-4 ${colorscheme === 'light' ? 'border-primary-color-light' : 'border-primary-color-dark'} ${className}`}
          {...props}
        />
      </View>
    );
  }
);
