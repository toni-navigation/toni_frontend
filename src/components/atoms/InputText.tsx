import React from 'react';
import {
  NativeSyntheticEvent,
  TextInput,
  TextInputChangeEventData,
  useColorScheme,
  View,
} from 'react-native';

interface InputTextProps {
  id: string;
  labelText: string;
  placeholder: string;
  onChange: (event: NativeSyntheticEvent<TextInputChangeEventData>) => void;
  value?: string;
}

export function InputText({
  id,
  labelText,
  placeholder,
  value,
  onChange,
}: InputTextProps) {
  const colorscheme = useColorScheme();

  return (
    <View>
      <TextInput
        accessibilityLabel={labelText}
        accessibilityLabelledBy={id}
        placeholder={placeholder}
        value={value}
        className={`border-2 rounded-full w-full p-4 mb-4 ${colorscheme === 'light' ? 'border-primary-color-light' : 'border-primary-color-dark'}`}
        onChange={onChange}
      />
    </View>
  );
}
