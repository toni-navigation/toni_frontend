import React from 'react';
import Svg, { Path, Circle } from 'react-native-svg';

interface ToniNameProps {
  width?: number;
  height?: number;
  viewBox?: string;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  strokeLinecap?: 'butt' | 'round' | 'square';
  strokeLinejoin?: 'miter' | 'round' | 'bevel';
}

export function ToniName({
  width = 50,
  height = 50,
  viewBox = '0 0 50 50',
  fill = 'currentColor',
  stroke = 'currentColor',
  strokeWidth = 2,
  strokeLinecap = 'round',
  strokeLinejoin = 'round',
}: ToniNameProps) {
  return (
    <Svg width={width} height={height} viewBox={viewBox}>
      <Path
        d="M42,42.53v-4.25c0-4.69-3.81-8.5-8.5-8.5h-17c-4.69,0-8.5,3.81-8.5,8.5v4.25"
        fill={fill}
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap={strokeLinecap}
        strokeLinejoin={strokeLinejoin}
      />

      <Circle
        cx="25"
        cy="15.97"
        r="8.5"
        fill={fill}
        stroke={stroke}
        strokeWidth={strokeWidth}
      />
    </Svg>
  );
}
