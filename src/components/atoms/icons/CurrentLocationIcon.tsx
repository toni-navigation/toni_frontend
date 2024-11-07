import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface CurrentLocationProps {
  width?: number;
  height?: number;
  viewBox?: string;
  fill?: string;
}
export function CurrentLocationIcon({
  width = 30,
  height = 36.222,
  viewBox = '0 0 30 36.222',
  fill = 'currentColor',
}: CurrentLocationProps) {
  return (
    <Svg
      id="ziel_icon"
      data-name="ziel icon"
      width={width}
      height={height}
      viewBox={viewBox}
    >
      <Path
        id="Pfad_81"
        data-name="Pfad 81"
        d="M29,15c0,10.889-14,20.222-14,20.222S1,25.889,1,15a14,14,0,1,1,28,0Z"
        fill={fill}
        stroke="#fc7d22"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        transform="translate(-1.998 0)"
      />
    </Svg>
  );
}
