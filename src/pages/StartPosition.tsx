import React from 'react';
import {
  NativeSyntheticEvent,
  TextInput,
  TextInputChangeEventData,
  View,
} from 'react-native';
import InputText from '../components/atoms/InputText';

interface StartPosition {
  onStartPositionChange: (startPosition: string) => void;
  value?: string;
}

function StartPosition({ onStartPositionChange, value }: StartPosition) {
  const inputChangeHandler = (
    event: NativeSyntheticEvent<TextInputChangeEventData>
  ) => {
    onStartPositionChange(event.nativeEvent.text);
  };

  return (
    <View>
      <InputText
        id="Start"
        labelText="Startpunkt"
        placeholder="Gib deinen Startpunkt ein"
        value={value}
        onChange={inputChangeHandler}
      />
    </View>
  );
}

export default StartPosition;
