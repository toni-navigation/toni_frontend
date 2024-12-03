import React from 'react';
import Svg, { Line } from 'react-native-svg';

interface ToniPlusProps {
  width?: number;
  height?: number;
  viewBox?: string;
  stroke?: string;
  strokeWidth?: number;
  strokeLinecap?: 'butt' | 'round' | 'square';
  strokeLinejoin?: 'miter' | 'round' | 'bevel';
}

export function ToniPlus({
  width = 50,
  height = 50,
  viewBox = '0 0 50 50',
  stroke = 'none',
  strokeWidth = 2,
  strokeLinecap = 'round',
  strokeLinejoin = 'round',
}: ToniPlusProps) {
  return (
    <Svg width={width} height={height} viewBox={viewBox}>
      <Line
        x1="25"
        y1="4"
        x2="25"
        y2="46"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap={strokeLinecap}
        strokeLinejoin={strokeLinejoin}
      />
      <Line
        x1="4"
        y1="25"
        x2="46"
        y2="25"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap={strokeLinecap}
        strokeLinejoin={strokeLinejoin}
      />
    </Svg>
  );
}
