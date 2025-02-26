import React from 'react';
import Svg, { Line, Linecap, Linejoin, Polyline } from 'react-native-svg';

interface ToniArrowHighProps {
  width?: number;
  height?: number;
  viewBox?: string;
  stroke?: string;
  strokeWidth?: number;
  strokeLinecap?: Linecap | undefined;
  strokeLinejoin?: Linejoin | undefined;
  fill?: string;
}

export function ToniArrowHigh({
  width = 50,
  height = 50,
  viewBox = '0 0 50 50',
  stroke = 'currentColor',
  strokeWidth = 2,
  strokeLinecap = 'round',
  strokeLinejoin = 'round',
  fill = 'none',
}: ToniArrowHighProps) {
  return (
    <Svg width={width} height={height} viewBox={viewBox}>
      <Line
        x1="25"
        y1="46"
        x2="25"
        y2="4"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap={strokeLinecap}
        strokeLinejoin={strokeLinejoin}
        fill={fill}
      />
      <Polyline
        points="11 18 25 4 39 18"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap={strokeLinecap}
        strokeLinejoin={strokeLinejoin}
        fill={fill}
      />
    </Svg>
  );
}
