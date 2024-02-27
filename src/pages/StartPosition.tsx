import React from 'react';
import {
  NativeSyntheticEvent,
  TextInput,
  TextInputChangeEventData,
  View,
} from 'react-native';

interface StartPosition {
  onStartPositionChange: (startPosition: string) => void;
  prefill?: string;
}

function StartPosition({ onStartPositionChange, prefill }: StartPosition) {
  const inputChangeHandler = (
    event: NativeSyntheticEvent<TextInputChangeEventData>
  ) => {
    onStartPositionChange(event.nativeEvent.text);
  };

  return (
    <View>
      <TextInput
        placeholder="Start"
        value={prefill}
        className="border-2 border-gray-800 rounded w-full p-2"
        onChange={inputChangeHandler}
      />
    </View>
  );
}

export default StartPosition;
