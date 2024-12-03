import React from 'react';
import Svg, { Line } from 'react-native-svg';

interface ToniCloseProps {
  width?: number;
  height?: number;
  viewBox?: string;
  stroke?: string;
  strokeWidth?: number;
  strokeLinecap?: 'butt' | 'round' | 'square';
  strokeLinejoin?: 'miter' | 'round' | 'bevel';
}

export function ToniClose({
  width = 50,
  height = 50,
  viewBox = '0 0 50 50',
  stroke = 'none',
  strokeWidth = 2,
  strokeLinecap = 'round',
  strokeLinejoin = 'round',
}: ToniCloseProps) {
  return (
    <Svg width={width} height={height} viewBox={viewBox}>
      <Line
        x1="44.95"
        y1="5.05"
        x2="5.05"
        y2="44.95"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap={strokeLinecap}
        strokeLinejoin={strokeLinejoin}
      />
      <Line
        x1="5.05"
        y1="5.05"
        x2="44.95"
        y2="44.95"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap={strokeLinecap}
        strokeLinejoin={strokeLinejoin}
      />
    </Svg>
  );
}
