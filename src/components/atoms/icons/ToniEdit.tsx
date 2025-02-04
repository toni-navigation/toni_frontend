import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface ToniEditProps {
  width?: number;
  height?: number;
  viewBox?: string;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  strokeLinecap?: 'butt' | 'round' | 'square';
  strokeLinejoin?: 'miter' | 'round' | 'bevel';
}

export function ToniEdit({
  width = 50,
  height = 50,
  viewBox = '0 0 50 50',
  fill = 'none',
  stroke = '#0a585c',
  strokeWidth = 2,
  strokeLinecap = 'round',
  strokeLinejoin = 'miter',
}: ToniEditProps) {
  return (
    <Svg width={width} height={height} viewBox={viewBox} fill={fill}>
      <Path
        d="M20.55,34.95c-1.97-1.97-3.95-3.95-5.92-5.92"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap={strokeLinecap}
        strokeLinejoin={strokeLinejoin}
        fill="none"
      />
      <Path
        d="M21.27,35.52l16.23-16.44c1.42-1.44,1.37-3.73-.11-5.13l-1.56-1.48c-1.48-1.4-3.82-1.37-5.24.07L14.37,28.98"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap={strokeLinecap}
        strokeLinejoin={strokeLinejoin}
        fill="none"
      />
      <Path
        d="M14.31,29.31l-2.79,8.11c-.25.72.35,1.33,1.07,1.09l8.16-2.63"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap={strokeLinecap}
        strokeLinejoin={strokeLinejoin}
        fill="none"
      />
      <Path
        d="M35.84,20.74c-2.05-2.05-4.1-4.1-6.16-6.16"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap={strokeLinecap}
        strokeLinejoin={strokeLinejoin}
        fill="none"
      />
    </Svg>
  );
}
