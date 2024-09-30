import { router } from 'expo-router';
import React, { useContext, useRef } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

import { themes } from '@/colors';
import { ThemeContext } from '@/components/ThemeProvider';
import { Welcome } from '@/components/Welcome';
import { Button } from '@/components/atoms/Button';
import { Header } from '@/components/atoms/Header';
import { Logo } from '@/components/atoms/icons/Logo';

export function Intro() {
  const [showWelcome, setShowWelcome] = React.useState(false);
  const pagerRef = useRef<any>(null);
  const [currentPage, setCurrentPage] = React.useState(0); // Add this line

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

  const styles = StyleSheet.create({
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

  if (showWelcome) {
    return <Welcome />;
  }

  // TODO PagerView with current version not working
  return (
    <SafeAreaView className="flex-1 bg-background">
      <View
        className="flex-1"
        accessibilityLabel="Swiper"
        accessibilityHint="Swipe nach links oder rechts um weitere Informationen zu bekommen"
      >
        {/* <PagerView */}
        {/*  className="flex-1" */}
        {/*  initialPage={0} */}
        {/*  ref={pagerRef} */}
        {/*  onPageSelected={(event) => */}
        {/*    handlePageChange(event.nativeEvent.position) */}
        {/*  } */}
        {/* > */}
        {/*  {pagerViewData.map((data, index) => ( */}
        {/*    // eslint-disable-next-line react/no-array-index-key */}
        {/*    */}
        {/*  ))} */}
        {/* </PagerView> */}
        <View className="px-8 mt-8">
          <View
            className="flex items-center pb-8"
            accessibilityLabel="Icon"
            accessibilityRole="image"
            accessibilityHint="Toni Logo"
          >
            {pagerViewData[0].icon}
          </View>
          <View className="flex items-center">
            <Header classes="text-primary">{pagerViewData[0].headline}</Header>
            <Text className="mx-auto text-center font-atkinsonRegular text-2xl text-textColor">
              {pagerViewData[0].text}
            </Text>
          </View>
        </View>
      </View>
      <View className="mx-8 mb-3">
        <View
          className="flex justify-center flex-row mb-14"
          accessibilityLabel="Progressbar Swiper"
          accessibilityHint="Swipe um für weitere Seiten"
        >
          {pagerViewData.map((data, index) => (
            <View
              style={index === currentPage ? styles.activeDot : styles.dot}
              /* eslint-disable-next-line react/no-array-index-key */
              key={index}
              testID="dot"
              accessibilityLabel={`Punkt-${index}`}
              accessibilityHint={`Seite ${index + 1}`}
            />
          ))}
        </View>
        <Button buttonType="primary" onPress={() => router.push('/agbs')}>
          Los gehts
        </Button>
      </View>
    </SafeAreaView>
  );
}
