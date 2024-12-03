import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface ToniPhoneProps {
  width?: number;
  height?: number;
  viewBox?: string;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  strokeLinecap?: 'butt' | 'round' | 'square';
  strokeLinejoin?: 'miter' | 'round' | 'bevel';
}

export function ToniPhone({
  width = 50,
  height = 50,
  viewBox = '0 0 50 50',
  fill = 'none',
  stroke = 'none',
  strokeWidth = 2,
  strokeLinecap = 'round',
  strokeLinejoin = 'round',
}: ToniPhoneProps) {
  return (
    <Svg width={width} height={height} viewBox={viewBox}>
      <Path
        fill={fill}
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap={strokeLinecap}
        strokeLinejoin={strokeLinejoin}
        d="M38.38,31.67v4.04c0,1.49-1.19,2.7-2.68,2.7-.08,0-.17,0-.25-.01-4.14-.45-8.12-1.87-11.61-4.13-3.25-2.07-6.01-4.82-8.07-8.07-2.27-3.51-3.69-7.51-4.13-11.67-.13-1.48.96-2.79,2.44-2.92.08,0,.16-.01.24-.01h4.04c1.35-.01,2.5.98,2.69,2.31.17,1.29.49,2.56.94,3.78.37.98.13,2.09-.61,2.84l-1.71,1.71c1.92,3.37,4.71,6.16,8.07,8.07l1.71-1.71c.75-.74,1.86-.98,2.84-.61,1.22.46,2.49.77,3.78.94,1.35.19,2.35,1.37,2.31,2.73Z"
      />
    </Svg>
  );
}
