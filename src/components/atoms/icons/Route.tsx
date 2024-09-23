import React, { useContext } from 'react';
import Svg, { Path } from 'react-native-svg';

import { themes } from '@/colors';
import { ThemeContext } from '@/components/ThemeProvider';

interface RouteProps {
  width?: number;
  height?: number;
  viewBox?: string;
  transform?: string;
}
export function Route({
  width = 100,
  height = 90,
  viewBox = '0 0 128 118',
  transform = '',
}: RouteProps) {
  const { theme } = useContext(ThemeContext);

  return (
    <Svg width={width} height={height} viewBox={viewBox} transform={transform}>
      <Path
        d="M84.857,20.755A17.737,17.737,0,1,1,99.794,38.288L87.734,58.162a17.756,17.756,0,0,1-28.1,21.6L37.485,90.832c.016.312.025.627.025.943a17.749,17.749,0,1,1-2.755-9.5l20.9-10.449a17.764,17.764,0,0,1,25.3-19.607L91.6,34.682A17.724,17.724,0,0,1,84.857,20.755Z"
        transform="translate(0 7)"
        fill={themes.external[`--${theme}-mode-primary`]}
      />
      <Path
        d="M23.779,58.245C10.322,58.245,0,68.444,0,81.01a22.08,22.08,0,0,0,.837,6.074,21.633,21.633,0,0,0,1.638,4.157,22.373,22.373,0,0,0,1.433,2.4,23.845,23.845,0,0,0,19.872,10.137,23.9,23.9,0,0,0,19.434-9.524,22.539,22.539,0,0,0,2.193-3.661,21.538,21.538,0,0,0,1.315-3.506,22.092,22.092,0,0,0,.837-6.074c0-12.566-10.326-22.765-23.779-22.765M37.286,84.586a12.67,12.67,0,0,1-.774,2.064,13.241,13.241,0,0,1-1.291,2.156,14.069,14.069,0,0,1-11.441,5.608,14.039,14.039,0,0,1-11.7-5.968,13.2,13.2,0,0,1-.844-1.411,12.755,12.755,0,0,1-.964-2.448,13.013,13.013,0,0,1-.493-3.576c0-7.4,6.077-13.4,14-13.4s14,6,14,13.4a13,13,0,0,1-.493,3.576"
        transform="translate(79.559 -57.245)"
        fill="#fc7d22"
      />
    </Svg>
  );
}
