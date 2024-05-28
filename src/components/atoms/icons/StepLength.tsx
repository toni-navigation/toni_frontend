import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface StepLengthProps {
  width?: number;
  height?: number;
  viewBox?: string;
  fill?: string;
}
export function StepLength({
  width = 24,
  height = 24,
  viewBox = '0 0 24 24',
  fill = 'currentColor',
}: StepLengthProps) {
  return (
    <Svg fill={fill} height={height} viewBox={viewBox} width={width}>
      <Path
        d="M16 6C16 4.34315 17.3431 3 19 3C20.6569 3 22 4.34315 22 6C22 7.65685 20.6569 9 19 9C18.838 9 18.679 8.98716 18.524 8.96245L16.4862 12.3205C16.8105 12.7997 17 13.3777 17 14C17 15.6569 15.6569 17 14 17C13.0972 17 12.2875 16.6012 11.7375 15.9701L7.99584 17.8407C7.9986 17.8934 8 17.9466 8 18C8 19.6569 6.65685 21 5 21C3.34315 21 2 19.6569 2 18C2 16.3431 3.34315 15 5 15C6.0662 15 7.00249 15.5562 7.53455 16.3943L11.066 14.6288C11.0228 14.4261 11 14.2157 11 14C11 12.3431 12.3431 11 14 11C14.4821 11 14.9376 11.1137 15.3413 11.3158L17.1391 8.35326C16.4452 7.80378 16 6.95388 16 6Z"
        fill={fill}
      />
    </Svg>
  );
}
