import React from 'react';
import Svg, { Polyline, Path } from 'react-native-svg';

interface ToniHomeProps {
  width?: number;
  height?: number;
  viewBox?: string;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  strokeLinecap?: 'butt' | 'round' | 'square';
  strokeLinejoin?: 'miter' | 'round' | 'bevel';
}

export function ToniHome({
  width = 50,
  height = 50,
  viewBox = '0 0 50 50',
  fill = 'currentColor',
  stroke = 'currentColor',
  strokeWidth = 2,
  strokeLinecap = 'round',
  strokeLinejoin = 'round',
}: ToniHomeProps) {
  return (
    <Svg width={width} height={height} viewBox={viewBox}>
      <Path
        d="M12.85,20.95l12.15-9.45,12.15,9.45v14.85c0,1.49-1.21,2.7-2.7,2.7H15.55c-1.49,0-2.7-1.21-2.7-2.7v-14.85Z"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap={strokeLinecap}
        strokeLinejoin={strokeLinejoin}
        fill={fill}
      />
      <Polyline
        points="20.95 38.5 20.95 25 29.05 25 29.05 38.5"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap={strokeLinecap}
        strokeLinejoin={strokeLinejoin}
        fill={fill}
      />
    </Svg>
  );
}
