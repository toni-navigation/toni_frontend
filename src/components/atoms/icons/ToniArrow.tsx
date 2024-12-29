import React from 'react';
import Svg, { Line, Polyline } from 'react-native-svg';

interface ToniArrowProps {
  width?: number;
  height?: number;
  viewBox?: string;
  stroke?: string;
}

export function ToniArrow({
  width = 50,
  height = 50,
  viewBox = '0 0 50 50',
  stroke = 'none',
}: ToniArrowProps) {
  return (
    <Svg width={width} height={height} viewBox={viewBox}>
      <Line
        x1="25"
        y1="46"
        x2="25"
        y2="4"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <Polyline
        points="4 25 25 4 46 25"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </Svg>
  );
}
