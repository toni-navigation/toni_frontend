import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface PauseProps {
  width?: number;
  height?: number;
  viewBox?: string;
  fill?: string;
}
export function Pause({
  width = 24,
  height = 24,
  viewBox = '0 0 24 24',
  fill = 'currentColor',
}: PauseProps) {
  return (
    <Svg
      fill={fill}
      height={height}
      viewBox={viewBox}
      width={width}
      testID="Pause"
    >
      <Path
        testID="PausePath"
        d="M5.74609 3C4.7796 3 3.99609 3.7835 3.99609 4.75V19.25C3.99609 20.2165 4.7796 21 5.74609 21H9.24609C10.2126 21 10.9961 20.2165 10.9961 19.25V4.75C10.9961 3.7835 10.2126 3 9.24609 3H5.74609Z"
        fill={fill}
      />
      <Path
        testID="PausePath"
        d="M14.7461 3C13.7796 3 12.9961 3.7835 12.9961 4.75V19.25C12.9961 20.2165 13.7796 21 14.7461 21H18.2461C19.2126 21 19.9961 20.2165 19.9961 19.25V4.75C19.9961 3.7835 19.2126 3 18.2461 3H14.7461Z"
        fill={fill}
      />
    </Svg>
  );
}
