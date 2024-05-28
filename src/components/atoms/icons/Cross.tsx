import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface CrossProps {
  width?: number;
  height?: number;
  viewBox?: string;
  fill?: string;
}
export function Cross({
  width = 24,
  height = 24,
  viewBox = '0 0 24 24',
  fill = '#000',
}: CrossProps) {
  return (
    <Svg width={width} height={height} viewBox={viewBox} testID="Cross">
      <Path
        d="M16 8L8 16M8.00001 8L16 16"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
        fill={fill}
      />
    </Svg>
  );
}
