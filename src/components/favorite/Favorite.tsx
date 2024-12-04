import { router } from 'expo-router';
import React, { useContext } from 'react';

import { themes } from '@/colors';
import { ThemeContext } from '@/components/ThemeProvider';
import { FavoritesCard } from '@/components/atoms/FavoritesCard';
import { Heart } from '@/components/atoms/icons/Heart';
import { Favorite } from '@/services/api-backend';

export function Favorites({ id, name, destinationType }: Partial<Favorite>) {
  const { theme } = useContext(ThemeContext);
  const icon =
    destinationType === 'home' ? (
      <Heart
        fill={themes.external[`--${theme}-mode-primary`]}
        width={50}
        height={50}
      />
    ) : (
      <Heart
        fill={themes.external[`--${theme}-mode-primary`]}
        width={50}
        height={50}
      />
    );

  return (
    <FavoritesCard
      onPress={() => {
        router.push({
          pathname: '/favorites/[id]',
          params: { id },
        });
      }}
      icon={icon}
    >
      {name}
    </FavoritesCard>
  );
}
