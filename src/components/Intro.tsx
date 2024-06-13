import { router } from 'expo-router';
import React, { useRef } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import PagerView from 'react-native-pager-view';

import { Button } from '@/components/atoms/Button';
import { Header } from '@/components/atoms/Header';
import { Logo } from '@/components/atoms/icons/Logo';
import styling from '@/stylings';

export function Intro() {
  // const [showCalibration, setShowCalibration] = React.useState(false);
  const pagerRef = useRef<any>(null);
  const [currentPage, setCurrentPage] = React.useState(0); // Add this line

  const colorscheme = useColorScheme();

  const pagerViewData: {
    headline: string;
    text: string;
    icon: React.ReactNode;
  }[] = [
    {
      headline: 'Dein Weg',
      text: 'Toni führt dich, auf deine Schrittlänge konfiguriert, sicher an dein Ziel!',
      icon: <Logo height={115} width={115} colorscheme={colorscheme} />,
    },
    {
      headline: 'Dein Klang',
      text: 'Entscheide individuell welche Stimme dich auf deinem Weg begleitet!',
      icon: <Logo height={115} width={115} colorscheme={colorscheme} />,
    },
    {
      headline: 'Deine Freiheit',
      text: 'Für mehr Leichtigkeit und Selbständigkeit in deinem Alltag!',
      icon: <Logo height={115} width={115} colorscheme={colorscheme} />,
    },
  ];

  const styles = StyleSheet.create({
    activeDot: {
      backgroundColor:
        colorscheme === 'light'
          ? styling.colors['primary-color-dark']
          : styling.colors['primary-color-light'],
      width: 20,
      height: 20,
      borderRadius: 25,
      marginLeft: 8,
      marginRight: 8,
    },
    dot: {
      backgroundColor: 'transparent',
      borderColor:
        colorscheme === 'light'
          ? styling.colors['primary-color-dark']
          : styling.colors['primary-color-light'],
      borderWidth: 3,
      width: 20,
      height: 20,
      borderRadius: 25,
      marginLeft: 8,
      marginRight: 8,
    },
  });

  const handlePageChange = (pageNumber: number) => {
    pagerRef.current?.setPage(pageNumber);
    setCurrentPage(pageNumber);
  };

  /*  useEffect(() => {
    const toggle = setInterval(() => {
      handlePageChange(currentPage === 2 ? 0 : currentPage + 1);
    }, 3000);

    return () => clearInterval(toggle);
  }, [currentPage]); */

  // if (showCalibration) {
  //   return <Calibration isFromIntro />;
  // }

  return (
    <SafeAreaView
      className={`flex-1 ${colorscheme === 'light' ? 'bg-background-light' : 'bg-background-dark'}`}
    >
      <View className="flex-1">
        <PagerView
          className="flex-1"
          initialPage={0}
          ref={pagerRef}
          onPageSelected={(event) =>
            handlePageChange(event.nativeEvent.position)
          }
        >
          {pagerViewData.map((data, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <View key={index} className="px-8 mt-8">
              <View className="flex items-center pb-8">{data.icon}</View>
              <View className="flex items-center">
                <Header>{data.headline}</Header>
                <Text
                  className={`mx-auto text-center font-atkinsonRegular text-2xl ${colorscheme === 'light' ? 'text-text-color-light' : 'text-background-light'}`}
                >
                  {data.text}
                </Text>
              </View>
            </View>
          ))}
        </PagerView>
      </View>
      <View className="mx-8 mb-3">
        <>
          <View className="flex justify-center flex-row mb-14">
            {pagerViewData.map((data, index) => (
              <View
                style={index === currentPage ? styles.activeDot : styles.dot}
                /* eslint-disable-next-line react/no-array-index-key */
                key={index}
              />
            ))}
          </View>
          <Button buttonType="accent" disabled onPress={() => {}}>
            Registrieren
          </Button>
          <Button
            buttonType="primary"
            onPress={() => router.replace('profile/calibration/0')}
          >
            Los gehts
          </Button>
        </>
      </View>
    </SafeAreaView>
  );
}
