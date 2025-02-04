import React from 'react';
import Svg, { Rect, Path, Circle } from 'react-native-svg';

interface ToniPasswordProps {
  width?: number;
  height?: number;
  viewBox?: string;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  strokeLinecap?: 'butt' | 'round' | 'square';
  strokeLinejoin?: 'miter' | 'round' | 'bevel';
}

export function ToniPassword({
  width = 50,
  height = 50,
  viewBox = '0 0 50 50',
  fill = 'none',
  stroke = '#0a585c',
  strokeWidth = 2,
  strokeLinecap = 'round',
  strokeLinejoin = 'round',
}: ToniPasswordProps) {
  return (
    <Svg width={width} height={height} viewBox={viewBox} fill={fill}>
      <Rect
        x="12.87"
        y="19.9"
        width="24.27"
        height="19.21"
        rx="3"
        ry="3"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap={strokeLinecap}
        strokeLinejoin={strokeLinejoin}
        fill="none"
      />
      <Path
        d="M32.05,19.43c.01-.18.02-.35.02-.53,0-4.42-3.17-8-7.08-8s-7.08,3.58-7.08,8c0,.18.01.36.02.53h14.11Z"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap={strokeLinecap}
        strokeLinejoin={strokeLinejoin}
        fill="none"
      />
      <Circle
        cx="25"
        cy="27.52"
        r="1.74"
        stroke={stroke}
        strokeWidth={strokeWidth}
        fill={stroke}
      />
      <Rect
        x="24.38"
        y="28.25"
        width="1.25"
        height="4.98"
        rx="0.5"
        ry="0.5"
        fill={stroke}
      />
    </Svg>
  );
}
