import React from 'react';

import { Icon } from '@/components/atoms/Icon';
import { Navbar } from '@/components/organisms/Navbar';

const iconsArray = {
  heart: ({ color }: { color: string }) => (
    <Icon color={color} icon="heart" size={48} />
  ),
  navigationArrow: ({ color }: { color: string }) => (
    <Icon color={color} icon="navigationArrow" size={41} />
  ),
  person: ({ color }: { color: string }) => (
    <Icon color={color} icon="person" size={48} />
  ),
};
export default function Layout() {
  return <Navbar icons={iconsArray} />;
}
