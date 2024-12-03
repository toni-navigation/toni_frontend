import React from 'react';
import Svg, { Polygon, Line } from 'react-native-svg';

interface ToniMapProps {
  width?: number;
  height?: number;
  viewBox?: string;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  strokeLinecap?: 'butt' | 'round' | 'square';
  strokeLinejoin?: 'miter' | 'round' | 'bevel';
}

export function ToniMap({
  width = 50,
  height = 50,
  viewBox = '0 0 50 50',
  fill = 'currentColor',
  stroke = 'currentColor',
  strokeWidth = 2,
  strokeLinecap = 'round',
  strokeLinejoin = 'round',
}: ToniMapProps) {
  return (
    <Svg width={width} height={height} viewBox={viewBox}>
      <Polygon
        points="5.2 14.2 5.2 43 17.8 35.8 32.2 43 44.8 35.8 44.8 7 32.2 14.2 17.8 7 5.2 14.2"
        fill={fill}
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap={strokeLinecap}
        strokeLinejoin={strokeLinejoin}
      />
      <Line
        x1="17.8"
        y1="7"
        x2="17.8"
        y2="35.8"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap={strokeLinecap}
        strokeLinejoin={strokeLinejoin}
      />
      <Line
        x1="32.2"
        y1="14.2"
        x2="32.2"
        y2="43"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap={strokeLinecap}
        strokeLinejoin={strokeLinejoin}
      />
    </Svg>
  );
}
