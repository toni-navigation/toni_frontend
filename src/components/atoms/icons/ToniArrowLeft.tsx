import React from 'react';
import Svg, { Path, Polyline } from 'react-native-svg';

interface ToniArrowLeftProps {
  width?: number;
  height?: number;
  viewBox?: string;
  stroke?: string;
  strokeWidth?: number;
  strokeLinecap?: 'butt' | 'round' | 'square';
  strokeLinejoin?: 'miter' | 'round' | 'bevel';
  fill?: string;
}

export function ToniArrowLeft({
  width = 50,
  height = 50,
  viewBox = '0 0 50 50',
  stroke = 'none',
  strokeWidth = 2,
  strokeLinecap = 'round',
  strokeLinejoin = 'round',
  fill = 'none',
}: ToniArrowLeftProps) {
  return (
    <Svg width={width} height={height} viewBox={viewBox}>
      <Polyline
        points="17.12 30.25 4 17.12 17.12 4"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap={strokeLinecap}
        strokeLinejoin={strokeLinejoin}
        fill={fill}
      />
      <Path
        d="M46,46v-18.38c0-5.8-4.7-10.5-10.5-10.5H4"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap={strokeLinecap}
        strokeLinejoin={strokeLinejoin}
        fill={fill}
      />
    </Svg>
  );
}
