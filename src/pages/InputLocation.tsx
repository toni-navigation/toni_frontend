import React from 'react';
import {
  NativeSyntheticEvent,
  TextInputChangeEventData,
  View,
} from 'react-native';
import InputText from '../components/atoms/InputText';

interface InputLocationProps {
  id: string;
  labelText: string;
  placeholder: string;
  onChange: (location: string) => void;
  query: string;
}

function InputLocation({
  id,
  labelText,
  placeholder,
  onChange,
  query,
}: InputLocationProps) {
  const inputChangeHandler = (
    event: NativeSyntheticEvent<TextInputChangeEventData>
  ) => {
    onChange(event.nativeEvent.text);
  };
  return (
    <View>
      <InputText
        id={id}
        labelText={labelText}
        onChange={inputChangeHandler}
        value={query}
        placeholder={placeholder}
      />
    </View>
  );
}

export default InputLocation;
