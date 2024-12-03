import React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';

interface ToniLocationProps {
  width?: number;
  height?: number;
  viewBox?: string;
  fillOuter?: string;
  fillInner?: string;
  stroke?: string;
  strokeWidth?: number;
  strokeLinecap?: 'butt' | 'round' | 'square';
  strokeLinejoin?: 'miter' | 'round' | 'bevel';
}

export function ToniLocation({
  width = 50,
  height = 50,
  viewBox = '0 0 50 50',
  fillOuter = 'none',
  fillInner = 'none',
  stroke = 'currentColor',
  strokeWidth = 2,
  strokeLinecap = 'round',
  strokeLinejoin = 'round',
}: ToniLocationProps) {
  return (
    <Svg width={width} height={height} viewBox={viewBox}>
      <Path
        d="M43,21c0,14-18,26-18,26,0,0-18-12-18-26C7,11.06,15.06,3,25,3s18,8.06,18,18Z"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap={strokeLinecap}
        strokeLinejoin={strokeLinejoin}
        fill={fillOuter}
      />
      <Circle
        cx="25"
        cy="21"
        r="8"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap={strokeLinecap}
        strokeLinejoin={strokeLinejoin}
        fill={fillInner}
      />
    </Svg>
  );
}
