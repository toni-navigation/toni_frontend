import React from 'react';
import Svg, { Path, Circle } from 'react-native-svg';

interface ToniMusicNotesProps {
  width?: number;
  height?: number;
  viewBox?: string;
  fillColorNote1: string;
  fillColorNote2: string;
}

export function ToniMusicNotes({
  width = 50,
  height = 50,
  viewBox = '0 0 50 50',
  fillColorNote1 = 'none',
  fillColorNote2 = 'none',
}: ToniMusicNotesProps) {
  return (
    <Svg width={width} height={height} viewBox={viewBox}>
      <Path
        d="M11.17,38.17v-16.61l15.33-2.56v16.61"
        fill="none"
        stroke={fillColorNote1}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <Circle
        cx="7.33"
        cy="38.17"
        r="3.83"
        fill={fillColorNote1}
        stroke={fillColorNote1}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Circle
        cx="22.67"
        cy="35.61"
        r="3.83"
        fill={fillColorNote1}
        stroke={fillColorNote1}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <Path
        d="M37.17,23.67v-10.11l9.33-1.56v10.11"
        fill="none"
        stroke={fillColorNote2}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <Circle
        cx="34.83"
        cy="23.67"
        r="2.33"
        fill={fillColorNote2}
        stroke={fillColorNote2}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Circle
        cx="44.17"
        cy="22.11"
        r="2.33"
        fill={fillColorNote2}
        stroke={fillColorNote2}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
