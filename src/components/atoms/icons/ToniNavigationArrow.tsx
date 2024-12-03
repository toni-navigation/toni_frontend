import React from 'react';
import Svg, { Polygon } from 'react-native-svg';

interface ToniNavigationArrowProps {
  width?: number;
  height?: number;
  viewBox?: string;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  strokeLinecap?: 'butt' | 'round' | 'square';
  strokeLinejoin?: 'miter' | 'round' | 'bevel';
}

export function ToniNavigationArrow({
  width = 50,
  height = 50,
  viewBox = '0 0 50 50',
  fill = 'none',
  stroke = 'none',
  strokeWidth = 2,
  strokeLinecap = 'round',
  strokeLinejoin = 'round',
}: ToniNavigationArrowProps) {
  return (
    <Svg width={width} height={height} viewBox={viewBox}>
      <Polygon
        points="7 24.05 43 7 25.95 43 22.16 27.84 7 24.05"
        fill={fill}
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap={strokeLinecap}
        strokeLinejoin={strokeLinejoin}
      />
    </Svg>
  );
}
