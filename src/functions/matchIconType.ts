import { IconByKey } from '@/components/organisms/Card';

export const matchIconType = (directionType: number): IconByKey => {
  switch (directionType) {
    case 9:
      return 'arrowRight';
    case 10:
      return 'arrowRight';
    case 11:
      return 'arrowRight';
    case 14:
      return 'arrowLeft';
    case 15:
      return 'arrowLeft';
    case 16:
      return 'arrowLeft';
    default:
      return 'arrowStraight';
  }
};
