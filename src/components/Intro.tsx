import { router } from 'expo-router';
import React, { useContext, useEffect, useRef } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import PagerView from 'react-native-pager-view';

import { themes } from '@/colors';
import { ThemeContext } from '@/components/ThemeProvider';
import { Button } from '@/components/atoms/Button';
import { Header } from '@/components/atoms/Header';
import { ToniLogo } from '@/components/atoms/icons/ToniLogo';
import { ToniMusicNotes } from '@/components/atoms/icons/ToniMusicNotes';
import { ToniWay } from '@/components/atoms/icons/ToniWay';

export function Intro() {
  const pagerRef = useRef<any>(null);
  const [currentPage, setCurrentPage] = React.useState(0);
  const { theme } = useContext(ThemeContext);

  const pagerViewData: {
    headline: string;
    text: string;
    icon: React.ReactNode;
  }[] = [
    {
      headline: 'Dein Weg',
      text: 'Toni führt dich, auf deine Schrittlänge konfiguriert, sicher an dein Ziel!',
      icon: <ToniLogo height={115} width={115} />,
    },
    {
      headline: 'Dein Klang',
      text: 'Entscheide individuell welche Stimme dich auf deinem Weg begleitet!',
      icon: (
        <ToniMusicNotes
          fillColorNote1={themes.external[`--${theme}-mode-primary`]}
          fillColorNote2={themes.external[`--accent`]}
          height={115}
          width={115}
        />
      ),
    },
    {
      headline: 'Deine Freiheit',
      text: 'Für mehr Leichtigkeit und Selbständigkeit in deinem Alltag!',
      icon: <ToniWay height={115} width={115} />,
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

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-1 mx-8 mb-3">
        <PagerView
          style={styles.container}
          initialPage={0}
          ref={pagerRef}
          onPageSelected={(event) =>
            handlePageChange(event.nativeEvent.position)
          }
        >
          {pagerViewData.map((data) => (
            <View key={data.headline} className="px-8 mt-8">
              <View className="flex items-center pb-8">{data.icon}</View>
              <View className="flex items-center">
                <Header classes="text-textColor">{data.headline}</Header>
                <Text className="mx-auto text-center font-atkinsonRegular text-medium my-8 text-textColor">
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
              key={data.headline}
            />
          ))}
        </View>
        <View className="flex items-center justify-center my-8">
          <Button
            width="third"
            buttonType="primary"
            onPress={() => router.push('/agbs')}
          >
            Los gehts
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
}
