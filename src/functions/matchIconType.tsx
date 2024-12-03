import React from 'react';

import { ToniArrowHigh } from '@/components/atoms/icons/ToniArrowHigh';
import { ToniArrowLeft } from '@/components/atoms/icons/ToniArrowLeft';
import { ToniArrowRight } from '@/components/atoms/icons/ToniArrowRight';

export const matchIconType = (
  directionType: number | undefined,
  stroke: string
): React.ReactNode => {
  switch (directionType) {
    case 9:
      return <ToniArrowRight width={200} height={200} stroke={stroke} />;
    case 10:
      return <ToniArrowRight width={200} height={200} stroke={stroke} />;
    case 11:
      return <ToniArrowRight width={200} height={200} stroke={stroke} />;
    case 14:
      return <ToniArrowLeft width={200} height={200} stroke={stroke} />;
    case 15:
      return <ToniArrowLeft width={200} height={200} stroke={stroke} />;
    case 16:
      return <ToniArrowLeft width={200} height={200} stroke={stroke} />;
    default:
      return <ToniArrowHigh width={200} height={200} stroke={stroke} />;
  }
};
