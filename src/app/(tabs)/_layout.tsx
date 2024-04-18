// import { Feather, MaterialIcons, AntDesign } from '@expo/vector-icons';
import React from 'react';

import { Navbar } from '@/components/organisms/Navbar';

const iconsArray = {
  navigation: ({ color }: { color: string }) => (
    // <Feather name="navigation" size={24} color={color} />
  ),
  favoriteList: ({ color }: { color: string }) => (
    // <MaterialIcons name="favorite-outline" size={24} color={color} />
  ),
  profile: ({ color }: { color: string }) => (
    // <AntDesign name="user" size={24} color={color} />
  ),
};
export default function Layout() {
  return <Navbar icons={iconsArray} />;
}
