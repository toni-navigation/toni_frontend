import React, { useContext } from 'react';

import { ThemeContext } from '@/components/ThemeProvider';
import { ArrowLeft } from '@/components/atoms/icons/ArrowLeft';
import { ArrowRight } from '@/components/atoms/icons/ArrowRight';
import { ArrowStraight } from '@/components/atoms/icons/ArrowStraight';

export const matchIconType = (
  directionType: number | undefined
): React.ReactNode => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { theme } = useContext(ThemeContext);
  const fill = theme === 'light' ? '#0A585C' : '#DAFBDE';
  switch (directionType) {
    case 9:
      return <ArrowRight fill={fill} width={200} height={200} />;
    case 10:
      return <ArrowRight width={200} height={200} fill={fill} />;
    case 11:
      return <ArrowRight width={200} height={200} fill={fill} />;
    case 14:
      return <ArrowLeft width={200} height={200} fill={fill} />;
    case 15:
      return <ArrowLeft width={200} height={200} fill={fill} />;
    case 16:
      return <ArrowLeft width={200} height={200} fill={fill} />;
    default:
      return <ArrowStraight width={200} height={200} fill={fill} />;
  }
};
