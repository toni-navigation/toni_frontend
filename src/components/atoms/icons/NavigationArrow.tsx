import React from 'react';
import Svg, { G, Path } from 'react-native-svg';

interface NavigationArrowProps {
  width?: number;
  height?: number;
  viewBox?: string;
  fill?: string;
}
export function NavigationArrow({
  width = 24,
  height = 24,
  viewBox = '0 0 20.48 20.68',
  fill = '#000',
}: NavigationArrowProps) {
  return (
    <Svg height={height} width={width} fill={fill} viewBox={viewBox}>
      <G>
        <G>
          <Path d="M14.18,6.75,9.9,13.05c-.14.14-.06.35-.06.49l3.23,6.74a.73.73,0,0,0,1.34-.1l6-19.2a.69.69,0,0,0-.93-.9l-19,6.7c-.71.15-.69,1-.05,1.34l6.84,3c.22.07.36.07.5-.08L14,6.54a.21.21,0,0,1,.28,0A.31.31,0,0,1,14.18,6.75Z" />
        </G>
      </G>
    </Svg>
  );
}
