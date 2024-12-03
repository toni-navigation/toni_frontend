import React from 'react';
import Svg, { Circle } from 'react-native-svg';

interface ToniCurrentLocationProps {
  width?: number;
  height?: number;
  viewBox?: string;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
}

export function ToniCurrentLocation({
  width = 50,
  height = 50,
  viewBox = '0 0 50 50',
  fill = 'currentColor',
  stroke = 'currentColor',
  strokeWidth = 2,
}: ToniCurrentLocationProps) {
  return (
    <Svg width={width} height={height} viewBox={viewBox}>
      <Circle
        cx="25"
        cy="25"
        r="8"
        fill={fill}
        stroke={stroke}
        strokeWidth={strokeWidth}
      />
      <Circle
        cx="25"
        cy="25"
        r="18"
        fill="none"
        stroke={stroke}
        strokeWidth={strokeWidth}
      />
    </Svg>
  );
}
