import { ColorValue } from 'react-native';
import { SvgXml } from 'react-native-svg';

import * as icons from '@/assets/icons/icons';

export type IconByKey = keyof typeof icons;

export interface IconProps {
  color: ColorValue;
  icon: IconByKey;
  size?: number;
}

export function Icon({ icon, size = 32, color }: IconProps) {
  return <SvgXml xml={icons[icon]} width={size} height={size} color={color} />;
}
