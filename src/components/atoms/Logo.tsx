import { SvgXml } from 'react-native-svg';

import * as icons from '@/assets/icons/icons';
import { IconByKey } from '@/components/atoms/Icon';

export interface LogoProps {
  size?: number;
  icon: IconByKey;
}

export function Logo({ icon, size }: LogoProps) {
  return <SvgXml xml={icons[icon]} width={size} height={size} />;
}
