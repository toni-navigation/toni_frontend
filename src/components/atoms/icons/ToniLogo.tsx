import React, { useContext } from 'react';
import Svg, { Path } from 'react-native-svg';

import { themes } from '@/colors';
import { ThemeContext } from '@/components/ThemeProvider';

interface ToniLogoProps {
  width?: number;
  height?: number;
  viewBox?: string;
}

export function ToniLogo({
  width = 50,
  height = 50,
  viewBox = '0 0 50 50',
}: ToniLogoProps) {
  const { theme } = useContext(ThemeContext);

  return (
    <Svg width={width} height={height} viewBox={viewBox}>
      <Path
        d="M22.85,11.36c-6.15,0-10.87,4.84-10.87,10.79,0,1,.13,1.96.38,2.88.18.69.44,1.35.75,1.97.2.39.41.77.65,1.14,1.92,2.9,5.22,4.81,9.08,4.81s6.94-1.78,8.88-4.52c.38-.54.72-1.12,1-1.74.25-.53.45-1.09.6-1.66.25-.92.38-1.88.38-2.88,0-5.96-4.72-10.79-10.87-10.79h0ZM29.03,23.85c-.09.34-.21.67-.35.98-.17.36-.36.7-.59,1.02-1.14,1.61-3.03,2.66-5.23,2.66s-4.22-1.12-5.35-2.83c-.14-.21-.27-.44-.39-.67-.18-.37-.33-.76-.44-1.16-.15-.54-.23-1.11-.23-1.7,0-3.51,2.78-6.35,6.4-6.35s6.4,2.85,6.4,6.35c0,.59-.08,1.16-.23,1.7Z"
        fill={themes.external[`--${theme}-mode-primary`]}
      />
      <Path
        d="M31.74,31.6l-8.45,14.63c-.2.35-.7.35-.9,0l-8.62-14.92c1.92,2.9,5.22,4.81,9.08,4.81s6.94-1.78,8.88-4.51h0Z"
        fill="#fc7d22"
      />
      <Path
        d="M15.69,5.18c10.14-4.05,18.21-.2,22.33,5.72"
        fill="none"
        stroke="#fc7d22"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeMiterlimit={10}
      />
      <Path
        d="M16.77,9.16c7.68-2.78,13.94-1.11,18.33,5.8"
        fill="none"
        stroke="#fc7d22"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeMiterlimit={10}
      />
    </Svg>
  );
}
