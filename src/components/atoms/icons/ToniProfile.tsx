import React from 'react';
import Svg, { Path, Circle } from 'react-native-svg';

interface ToniProfileProps {
  width?: number;
  height?: number;
  viewBox?: string;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  strokeLinecap?: 'butt' | 'round' | 'square';
  strokeLinejoin?: 'miter' | 'round' | 'bevel';
}

export function ToniProfile({
  width = 50,
  height = 50,
  viewBox = '0 0 50 50',
  fill = 'currentColor',
  stroke = 'currentColor',
  strokeWidth = 2,
  strokeLinecap = 'round',
  strokeLinejoin = 'round',
}: ToniProfileProps) {
  return (
    <Svg width={width} height={height} viewBox={viewBox}>
      <Path
        d="M44.62,45.23v-4.9c0-5.42-4.39-9.81-9.81-9.81H15.19c-5.42,0-9.81,4.39-9.81,9.81v4.9"
        stroke={stroke}
        fill={fill}
        strokeWidth={strokeWidth}
        strokeLinecap={strokeLinecap}
        strokeLinejoin={strokeLinejoin}
      />

      <Circle
        cx="25"
        cy="14.58"
        r="9.81"
        stroke={stroke}
        fill={fill}
        strokeWidth={strokeWidth}
        strokeLinecap={strokeLinecap}
        strokeLinejoin={strokeLinejoin}
      />
    </Svg>
  );
}
