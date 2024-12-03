import React from 'react';
import Svg, { Path, Polyline } from 'react-native-svg';

interface ToniArrowRightProps {
  width?: number;
  height?: number;
  viewBox?: string;
  stroke?: string;
  strokeWidth?: number;
  strokeLinecap?: 'butt' | 'round' | 'square';
  strokeLinejoin?: 'miter' | 'round' | 'bevel';
  fill?: string;
}

export function ToniArrowRight({
  width = 50,
  height = 50,
  viewBox = '0 0 50 50',
  stroke = 'currentColor',
  strokeWidth = 2,
  strokeLinecap = 'round',
  strokeLinejoin = 'round',
  fill = 'currentColor',
}: ToniArrowRightProps) {
  return (
    <Svg width={width} height={height} viewBox={viewBox}>
      <Polyline
        points="32.88 30.25 46 17.12 32.88 4"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap={strokeLinecap}
        strokeLinejoin={strokeLinejoin}
        fill={fill}
      />
      <Path
        d="M4,46v-18.38c0-5.8,4.7-10.5,10.5-10.5h31.5"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap={strokeLinecap}
        strokeLinejoin={strokeLinejoin}
        fill={fill}
      />
    </Svg>
  );
}
