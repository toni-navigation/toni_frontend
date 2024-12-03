import React from 'react';
import Svg, { Line, Polyline } from 'react-native-svg';

interface ToniArrowSwitchProps {
  width?: number;
  height?: number;
  viewBox?: string;
  stroke?: string;
  strokeWidth?: number;
  strokeLinecap?: 'butt' | 'round' | 'square';
  strokeLinejoin?: 'miter' | 'round' | 'bevel';
  fill?: string;
}

export function ToniArrowSwitch({
  width = 85,
  height = 50,
  viewBox = '0 0 85 50',
  stroke = 'currentColor',
  strokeWidth = 5,
  strokeLinecap = 'round',
  strokeLinejoin = 'round',
  fill = 'currentColor',
}: ToniArrowSwitchProps) {
  return (
    <Svg width={width} height={height} viewBox={viewBox}>
      <Line
        x1="19.7"
        y1="41.41"
        x2="19.7"
        y2="4"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap={strokeLinecap}
        strokeLinejoin={strokeLinejoin}
      />
      <Polyline
        points="1 22.7 19.7 4 38.41 22.7"
        fill={fill}
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap={strokeLinecap}
        strokeLinejoin={strokeLinejoin}
      />

      <Line
        x1="65.3"
        y1="8.05"
        x2="65.3"
        y2="45.46"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap={strokeLinecap}
        strokeLinejoin={strokeLinejoin}
      />
      <Polyline
        points="44.59 26.75 65.3 45.46 84 26.75"
        fill={fill}
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap={strokeLinecap}
        strokeLinejoin={strokeLinejoin}
      />
    </Svg>
  );
}
