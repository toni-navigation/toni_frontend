import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface StarProps {
  width?: number;
  height?: number;
  viewBox?: string;
  fill?: string;
  classes?: string;
}
export function Star({
  width = 24,
  height = 24,
  viewBox = '0 0 24 24',
  fill = 'none',
  classes = '',
}: StarProps) {
  return (
    <Svg
      height={height}
      viewBox={viewBox}
      width={width}
      className={classes}
      testID="Star"
    >
      <Path
        d="M11.5,1l3.245,6.253L22,8.262l-5.25,4.865L17.989,20,11.5,16.753,5.011,20,6.25,13.127,1,8.262,8.255,7.253Z"
        fill={fill}
        testID="HeartPath"
      />
    </Svg>
  );
}
