import React, { forwardRef } from 'react';
import { TextInput, useColorScheme, View } from 'react-native';
import { TextInputProps } from 'react-native/Libraries/Components/TextInput/TextInput';

export const InputText = forwardRef<TextInput, TextInputProps>(
  ({ className, ...props }, ref) => {
    const colorscheme = useColorScheme();

    // TODO: add cross to delete value
    return (
      <View>
        <TextInput
          ref={ref}
          className={`border-2 rounded-[25px] w-ful l p-4 mb-4 ${colorscheme === 'light' ? 'border-primary-color-dark' : 'border-primary-color-light text-background-light'} ${className}`}
          {...props}
        />
      </View>
    );
  }
);
