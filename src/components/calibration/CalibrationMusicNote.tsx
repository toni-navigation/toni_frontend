import React, { useContext, useEffect, useRef } from 'react';
import { Animated, View } from 'react-native';

import { themes } from '@/colors';
import { ThemeContext } from '@/components/ThemeProvider';
import { ToniMusicNotes } from '@/components/atoms/icons/ToniMusicNotes';

interface CalibrationHeaderProps {
  steps: number;
}
export function CalibrationMusicNote({ steps }: CalibrationHeaderProps) {
  const progress = useRef(new Animated.Value(0)).current;
  const { theme } = useContext(ThemeContext);

  const iconColor = themes.external[`--${theme}-mode-primary`];

  useEffect(() => {
    Animated.timing(progress, {
      toValue: steps / 30,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [steps, progress]);

  const borderColor = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [
      themes.external[`--${theme}-mode-primary-inverted`],
      themes.external[`--${theme}-mode-primary`],
    ],
  });

  return (
    <View
      style={{
        borderColor: iconColor,
        borderWidth: 4,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 16,
        borderRadius: 9999,
        width: '60%',
        aspectRatio: 1,
        alignSelf: 'center',
        margin: 30,
      }}
    >
      <ToniMusicNotes
        fillColorNote1={themes.external[`--${theme}-mode-primary`]}
        fillColorNote2={themes.external[`--${theme}-mode-primary`]}
        width={130}
        height={130}
      />
    </View>
  );
}
