import React from 'react';
import Svg, { Polyline, Path } from 'react-native-svg';

interface ToniEmailProps {
  width?: number;
  height?: number;
  viewBox?: string;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  strokeLinecap?: 'butt' | 'round' | 'square';
  strokeLinejoin?: 'miter' | 'round' | 'bevel';
}

export function ToniEmail({
  width = 50,
  height = 50,
  viewBox = '0 0 50 50',
  fill = 'currentColor',
  stroke = 'currentColor',
  strokeWidth = 2,
  strokeLinecap = 'round',
  strokeLinejoin = 'round',
}: ToniEmailProps) {
  return (
    <Svg width={width} height={height} viewBox={viewBox}>
      <Path
        d="M12,12h26c1.79,0,3.25,1.46,3.25,3.25v19.5c0,1.79-1.46,3.25-3.25,3.25H12c-1.79,0-3.25-1.46-3.25-3.25V15.25c0-1.79,1.46-3.25,3.25-3.25Z"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap={strokeLinecap}
        strokeLinejoin={strokeLinejoin}
        fill={fill}
      />
      <Polyline
        points="41.25 15.25 25 26.62 8.75 15.25"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap={strokeLinecap}
        strokeLinejoin={strokeLinejoin}
        fill={fill}
      />
    </Svg>
  );
}
