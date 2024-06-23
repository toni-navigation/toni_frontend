import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface MusicNoteProps {
  width?: number;
  height?: number;
  viewBox?: string;
  fill?: string;
}
export function MusicNote({
  width = 83,
  height = 83,
  viewBox = '0 0 86.41 84.71',
  fill = 'currentColor',
}: MusicNoteProps) {
  return (
    <Svg
      fill={fill}
      viewBox={viewBox}
      width={width}
      height={height}
      testID="MusicNote"
    >
      <Path
        testID="MusicNotePath"
        d="M51.7,26.17a2.28,2.28,0,0,0-2.28-2.28,2.51,2.51,0,0,0-.66.1L18.35,33.11a2.28,2.28,0,0,0-1.62,2.18v30a10.65,10.65,0,1,0,4.56,8.74c0-.18,0-.35,0-.52a1.93,1.93,0,0,0,0-.24V49.16L47.14,41.4V59.25A10.66,10.66,0,1,0,51.7,68c0-.18,0-.35,0-.52a1.93,1.93,0,0,0,0-.24Z"
      />
      <Path
        testID="MusicNotePath"
        d="M86.41,1.39A1.39,1.39,0,0,0,84.62.06L66.12,5.61a1.39,1.39,0,0,0-1,1.33V25.21a6.48,6.48,0,1,0,2.78,5.32c0-.11,0-.21,0-.32s0-.09,0-.14V15.37l15.72-4.72V21.51a6.48,6.48,0,1,0,2.78,5.32c0-.11,0-.22,0-.32a.76.76,0,0,0,0-.15Z"
      />
    </Svg>
  );
}
