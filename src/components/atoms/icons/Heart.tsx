import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface HeartProps {
  width?: number;
  height?: number;
  viewBox?: string;
  fill?: string;
}
export function Heart({
  width = 24,
  height = 24,
  viewBox = '0 0 24 24',
  fill = '#000',
}: HeartProps) {
  return (
    <Svg height={height} viewBox={viewBox} width={width}>
      <Path
        d="M12.8199 5.57912L11.9992 6.40163L11.1759 5.57838C9.07688 3.47931 5.67361 3.47931 3.57455 5.57838C1.47548 7.67744 1.47548 11.0807 3.57455 13.1798L11.4699 21.0751C11.7628 21.368 12.2377 21.368 12.5306 21.0751L20.432 13.1783C22.5264 11.0723 22.53 7.67857 20.4306 5.57912C18.3277 3.47623 14.9228 3.47623 12.8199 5.57912Z"
        fill={fill}
      />
    </Svg>
  );
}
