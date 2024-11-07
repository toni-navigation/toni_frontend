import { router } from 'expo-router';
import React, { useContext, useEffect, useRef } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import PagerView from 'react-native-pager-view';

import { themes } from '@/colors';
import { ThemeContext } from '@/components/ThemeProvider';
import { Button } from '@/components/atoms/Button';
import { Header } from '@/components/atoms/Header';
import { Logo } from '@/components/atoms/icons/Logo';
import { useReverseData } from '@/mutations/useReverseData';
import { useCurrentLocationStore } from '@/store/useCurrentLocationStore';

export function Intro() {
  const pagerRef = useRef<any>(null);
  const [currentPage, setCurrentPage] = React.useState(0); // Add this line
  const currentLocation = useCurrentLocationStore(
    (state) => state.currentLocation
  );
  const { theme } = useContext(ThemeContext);

  const pagerViewData: {
    headline: string;
    text: string;
    icon: React.ReactNode;
  }[] = [
    {
      headline: 'Dein Weg',
      text: 'Toni führt dich, auf deine Schrittlänge konfiguriert, sicher an dein Ziel!',
      icon: <Logo height={115} width={115} />,
    },
    {
      headline: 'Dein Klang',
      text: 'Entscheide individuell welche Stimme dich auf deinem Weg begleitet!',
      icon: <Logo height={115} width={115} />,
    },
    {
      headline: 'Deine Freiheit',
      text: 'Für mehr Leichtigkeit und Selbständigkeit in deinem Alltag!',
      icon: <Logo height={115} width={115} />,
    },
  ];

  const handlePageChange = (pageNumber: number) => {
    pagerRef.current?.setPage(pageNumber);
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    const toggle = setInterval(() => {
      handlePageChange(currentPage === 2 ? 0 : currentPage + 1);
    }, 4000);

    return () => clearInterval(toggle);
  }, [currentPage]);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    activeDot: {
      backgroundColor: themes.external[`--${theme}-mode-primary`],
      width: 20,
      height: 20,
      borderRadius: 25,
      marginLeft: 8,
      marginRight: 8,
    },
    dot: {
      backgroundColor: 'transparent',
      borderColor: themes.external[`--${theme}-mode-primary`],
      borderWidth: 3,
      width: 20,
      height: 20,
      borderRadius: 25,
      marginLeft: 8,
      marginRight: 8,
    },
    page: {
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
  const reverseLocation = useReverseData();
  const createCurrentLocationMessage = async () => {
    if (currentLocation) {
      const currentLocationData = await reverseLocation.mutateAsync({
        lat: currentLocation.coords.latitude,
        lon: currentLocation.coords.longitude,
      });
      console.log(
        'currentLocationData',
        currentLocationData.features[0].properties
      );
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-1 mx-8 mb-3">
        <Button
          width="full"
          onPress={createCurrentLocationMessage}
          buttonType="primary"
        >
          Test
        </Button>
        <PagerView
          style={styles.container}
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
                <Header classes="text-textColor">{data.headline}</Header>
                <Text className="mx-auto text-center font-atkinsonRegular text-2xl text-textColor">
                  {data.text}
                </Text>
              </View>
            </View>
          ))}
        </PagerView>
        <View className="flex justify-center flex-row mb-14">
          {pagerViewData.map((data, index) => (
            <View
              style={index === currentPage ? styles.activeDot : styles.dot}
              /* eslint-disable-next-line react/no-array-index-key */
              key={index}
            />
          ))}
        </View>

        <Button
          width="full"
          buttonType="primary"
          onPress={() => router.push('/agbs')}
        >
          Los gehts
        </Button>
      </View>
    </SafeAreaView>
  );
}
