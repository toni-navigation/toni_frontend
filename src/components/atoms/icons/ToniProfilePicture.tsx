import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface ToniProfilPictureProps {
  width?: number;
  height?: number;
  viewBox?: string;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  strokeLinecap?: 'butt' | 'round' | 'square';
  strokeLinejoin?: 'miter' | 'round' | 'bevel';
}

export function ToniProfilePicture({
  width = 50,
  height = 50,
  viewBox = '0 0 50 50',
  fill = 'none',
  stroke = 'none',
  strokeWidth = 2,
  strokeLinecap = 'round',
  strokeLinejoin = 'round',
}: ToniProfilPictureProps) {
  return (
    <Svg width={width} height={height} viewBox={viewBox}>
      <Path
        d="M25,1.57C14.86,1.57,6.65,9.79,6.65,19.92c0,14.27,18.35,28.51,18.35,28.51,0,0,18.35-14.24,18.35-28.51,0-10.14-8.22-18.35-18.35-18.35ZM25,36c-8.84,0-16-7.16-16-16S16.16,4,25,4s16,7.16,16,16-7.16,16-16,16Z"
        fill={fill}
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap={strokeLinecap}
        strokeLinejoin={strokeLinejoin}
      />
    </Svg>
  );
}
