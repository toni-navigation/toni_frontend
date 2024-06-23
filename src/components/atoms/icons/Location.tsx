import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface LocationProps {
  width?: number;
  height?: number;
  viewBox?: string;
  fill?: string;
}
export function Location({
  width = 34.939,
  height = 34.939,
  viewBox = '0 0 34.939 34.939',
  fill = '#000',
}: LocationProps) {
  return (
    <Svg width={width} height={height} viewBox={viewBox} testID="Location">
      <Path
        d="M19.468,2A17.469,17.469,0,1,1,2,19.468,17.469,17.469,0,0,1,19.468,2Zm0,2.62A14.849,14.849,0,1,0,34.317,19.468,14.849,14.849,0,0,0,19.468,4.619Zm-.006,4.367A10.477,10.477,0,1,1,8.985,19.462,10.477,10.477,0,0,1,19.462,8.986Z"
        transform="translate(-1.998 -1.999)"
        fill={fill}
        testID="LocationPath"
      />
    </Svg>
  );
}
