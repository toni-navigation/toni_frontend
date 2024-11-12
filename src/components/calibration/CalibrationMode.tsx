import React, { useContext } from 'react';
import { Text } from 'react-native';

import { themes } from '@/colors';
import { ThemeContext } from '@/components/ThemeProvider';

interface CalibrationModeProps {
  steps: number;
  maxSteps: number;
}
export function CalibrationMode({ steps, maxSteps }: CalibrationModeProps) {
  const { theme } = useContext(ThemeContext);
  // const progress = useRef(new Animated.Value(0)).current;
  const iconColor = themes.external[`--${theme}-mode-primary`];
  // useEffect(() => {
  //   Animated.timing(progress, {
  //     toValue: steps / maxSteps,
  //     duration: 500,
  //     useNativeDriver: false,
  //   }).start();
  // }, [steps, maxSteps, progress]);
  //
  // const borderColor = progress.interpolate({
  //   inputRange: [0, 1],
  //   outputRange: [
  //     themes.external[`--${theme}-mode-primary-inverted`],
  //     themes.external[`--${theme}-mode-primary`],
  //   ],
  // });

  return (
    <>
      {/* <Animated.View */}
      {/*  style={{ */}
      {/*    borderColor, */}
      {/*    borderWidth: 4, */}
      {/*    justifyContent: 'center', */}
      {/*    alignItems: 'center', */}
      {/*    marginTop: 16, */}
      {/*    borderRadius: 9999, */}
      {/*    width: '50%', */}
      {/*    aspectRatio: 1, */}
      {/*    alignSelf: 'center', */}
      {/*    margin: 30, */}
      {/*  }} */}
      {/* > */}
      {/*  <MusicNote fill={iconColor} width={83} height={83} /> */}
      {/* </Animated.View> */}
      <Text
        testID="Mode"
        className="text-small font-atkinsonRegular mt-8 mb-2 text-textColor text-center"
      >
        Gelaufene Schritte:
      </Text>
      <Text className="text-large font-generalSansSemi text-primary text-center">
        {steps ?? '-'}
      </Text>
    </>
  );
}
