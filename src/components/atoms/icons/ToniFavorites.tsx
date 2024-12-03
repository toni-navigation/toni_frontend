import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface ToniFavoritesProps {
  width?: number;
  height?: number;
  viewBox?: string;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  strokeLinecap?: 'butt' | 'round' | 'square';
  strokeLinejoin?: 'miter' | 'round' | 'bevel';
}

export function ToniFavorites({
  width = 50,
  height = 50,
  viewBox = '0 0 50 50',
  fill = 'currentColor',
  stroke = 'currentColor',
  strokeWidth = 2,
  strokeLinecap = 'round',
  strokeLinejoin = 'round',
}: ToniFavoritesProps) {
  return (
    <Svg width={width} height={height} viewBox={viewBox}>
      <Path
        d="M42.76,9.92c-4.31-4.32-11.31-4.32-15.63,0,0,0,0,0,0,0l-2.13,2.13-2.13-2.13c-4.32-4.32-11.32-4.32-15.63,0-4.32,4.32-4.32,11.32,0,15.63l2.13,2.13,15.63,15.63,15.63-15.63,2.13-2.13c4.32-4.31,4.32-11.31,0-15.63,0,0,0,0,0,0Z"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap={strokeLinecap}
        strokeLinejoin={strokeLinejoin}
        fill={fill}
      />
    </Svg>
  );
}
