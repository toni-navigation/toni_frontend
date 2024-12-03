import React, { useContext } from 'react';
import Svg, { Path, Circle } from 'react-native-svg';

import { themes } from '@/colors';
import { ThemeContext } from '@/components/ThemeProvider';

interface ToniWayProps {
  width?: number;
  height?: number;
  viewBox?: string;
}

export function ToniWay({
  width = 81,
  height = 50,
  viewBox = '0 0 81 50',
}: ToniWayProps) {
  const { theme } = useContext(ThemeContext);

  return (
    <Svg width={width} height={height} viewBox={viewBox}>
      <Circle
        cx="26.06"
        cy="36.94"
        r="3.44"
        fill={themes.external[`--${theme}-mode-primary`]}
        stroke={themes.external[`--${theme}-mode-primary`]}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <Circle
        cx="45.56"
        cy="36.94"
        r="3.44"
        fill={themes.external[`--${theme}-mode-primary`]}
        stroke={themes.external[`--${theme}-mode-primary`]}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <Circle
        cx="6.57"
        cy="36.94"
        r="3.44"
        fill={themes.external[`--${theme}-mode-primary`]}
        stroke={themes.external[`--${theme}-mode-primary`]}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />

      <Path
        d="M78.04,23.33c0,8.81-11.33,16.37-11.33,16.37,0,0-11.33-7.55-11.33-16.37,0-6.26,5.07-11.33,11.33-11.33s11.33,5.07,11.33,11.33Z"
        fill="none"
        stroke="#fc7d22"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <Circle
        cx="66.71"
        cy="23.33"
        r="5.04"
        fill="#fc7d22"
        stroke="#fc7d22"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </Svg>
  );
}
