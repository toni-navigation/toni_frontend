import React from 'react';
import {
  NativeSyntheticEvent,
  TextInput,
  TextInputChangeEventData,
  View,
} from 'react-native';

interface Destination {
  onDestinationChange: (destination: string) => void;
  query: string;
}

function Destination({ onDestinationChange, query }: Destination) {
  const inputChangeHandler = (
    event: NativeSyntheticEvent<TextInputChangeEventData>
  ) => {
    onDestinationChange(event.nativeEvent.text);
  };
  return (
    <View>
      <TextInput
        placeholder="Ziel"
        value={query}
        className="border-2 border-gray-800 rounded w-full p-2"
        onChange={inputChangeHandler}
      />
    </View>
  );
}

export default Destination;
