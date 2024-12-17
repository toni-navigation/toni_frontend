import React, { useContext } from 'react';
import Svg, { Circle, Path } from 'react-native-svg';

import { themes } from '@/colors';
import { ThemeContext } from '@/components/ThemeProvider';

interface ToniProfilPictureProps {
  width?: number;
  height?: number;
  viewBox?: string;
  strokeWidth?: number;
  strokeLinecap?: 'butt' | 'round' | 'square';
  strokeLinejoin?: 'miter' | 'round' | 'bevel';
}

export function ToniProfilePicture({
  width = 50,
  height = 50,
  viewBox = '0 0 50 50',
  strokeWidth = 1,
  strokeLinecap = 'round',
  strokeLinejoin = 'round',
}: ToniProfilPictureProps) {
  const { theme } = useContext(ThemeContext);

  return (
    <Svg width={width} height={height} viewBox={viewBox}>
      <Path
        d="M25,1.57C14.86,1.57,6.65,9.79,6.65,19.92c0,14.27,18.35,28.51,18.35,28.51,0,0,18.35-14.24,18.35-28.51,0-10.14-8.22-18.35-18.35-18.35ZM25,36c-8.84,0-16-7.16-16-16S16.16,4,25,4s16,7.16,16,16-7.16,16-16,16Z"
        fill={themes.external[`--${theme}-mode-primary`]}
        stroke={themes.external[`--${theme}-mode-primary`]}
        strokeWidth={strokeWidth}
        strokeLinecap={strokeLinecap}
        strokeLinejoin={strokeLinejoin}
      />
      <Path
        d="M17 25
       A5 5 0 0 1 22 20
       H28
       A5 5 0 0 1 33 25
       V28
       H17
       V25 Z"
        fill="#fc7d22"
      />
      <Circle cx="25" cy="14.58" r="5" fill="#fc7d22" />
    </Svg>
  );
}
