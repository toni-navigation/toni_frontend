import React from 'react';
import { ColorSchemeName } from 'react-native';

import { ArrowLeft } from '@/components/atoms/icons/ArrowLeft';
import { ArrowRight } from '@/components/atoms/icons/ArrowRight';
import { ArrowStraight } from '@/components/atoms/icons/ArrowStraight';
import stylings from '@/stylings';

export const matchIconType = (
  directionType: number,
  colorscheme: ColorSchemeName
): React.ReactNode => {
  switch (directionType) {
    case 9:
      return (
        <ArrowRight
          fill={`${colorscheme === 'light' ? stylings.colors['primary-color-dark'] : stylings.colors['primary-color-light']}`}
          width={200}
          height={200}
        />
      );
    case 10:
      return (
        <ArrowRight
          width={200}
          height={200}
          fill={`${colorscheme === 'light' ? stylings.colors['primary-color-dark'] : stylings.colors['primary-color-light']}`}
        />
      );
    case 11:
      return (
        <ArrowRight
          width={200}
          height={200}
          fill={`${colorscheme === 'light' ? stylings.colors['primary-color-dark'] : stylings.colors['primary-color-light']}`}
        />
      );
    case 14:
      return (
        <ArrowLeft
          width={200}
          height={200}
          fill={`${colorscheme === 'light' ? stylings.colors['primary-color-dark'] : stylings.colors['primary-color-light']}`}
        />
      );
    case 15:
      return (
        <ArrowLeft
          width={200}
          height={200}
          fill={`${colorscheme === 'light' ? stylings.colors['primary-color-dark'] : stylings.colors['primary-color-light']}`}
        />
      );
    case 16:
      return (
        <ArrowLeft
          width={200}
          height={200}
          fill={`${colorscheme === 'light' ? stylings.colors['primary-color-dark'] : stylings.colors['primary-color-light']}`}
        />
      );
    default:
      return (
        <ArrowStraight
          width={200}
          height={200}
          fill={`${colorscheme === 'light' ? stylings.colors['primary-color-dark'] : stylings.colors['primary-color-light']}`}
        />
      );
  }
};
