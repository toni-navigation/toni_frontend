import { SvgXml } from 'react-native-svg';

import * as icons from '@/assets/icons/icons';

export type IconByKey = keyof typeof icons;

export interface IconProps {
  color: string;
  icon: IconByKey;
  size?: number;
}

export function Icon({ icon, size = 32, color }: IconProps) {
  return (
    <SvgXml
      accessibilityLabel={icon}
      accessibilityHint={`Icon ${icon}`}
      xml={icons[icon]}
      width={size}
      height={size}
      color={color}
    />
  );
}
