import { ColorSchemeName } from 'react-native';
import { SvgXml } from 'react-native-svg';

import * as icons from '@/assets/icons/icons';

export interface LogoProps {
  mode: ColorSchemeName;
  size?: number;
}

export function Logo({ mode, size }: LogoProps) {
  if (mode === 'light') {
    return <SvgXml xml={icons.logoLight} width={size} height={size} />;
  }
  if (mode === 'dark') {
    return <SvgXml xml={icons.logoDark} width={size} height={size} />;
  }
}
