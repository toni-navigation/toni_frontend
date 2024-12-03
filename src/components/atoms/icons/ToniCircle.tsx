import React from 'react';
import Svg, { Circle } from 'react-native-svg';

interface ToniCircleProps {
  width?: number;
  height?: number;
  viewBox?: string;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  strokeLinecap?: 'butt' | 'round' | 'square';
  strokeLinejoin?: 'miter' | 'round' | 'bevel';
}

export function ToniCircle({
  width = 50,
  height = 50,
  viewBox = '0 0 50 50',
  fill = 'none',
  stroke = 'none',
  strokeWidth = 2,
  strokeLinecap = 'round',
  strokeLinejoin = 'round',
}: ToniCircleProps) {
  return (
    <Svg width={width} height={height} viewBox={viewBox}>
      <Circle
        cx="25"
        cy="25"
        r="8"
        fill={fill}
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap={strokeLinecap}
        strokeLinejoin={strokeLinejoin}
      />
    </Svg>
  );
}
