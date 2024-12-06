import React, { useState } from 'react';
import { NativeSyntheticEvent, View } from 'react-native';
import PagerView from 'react-native-pager-view';
import { TabButton } from '@/components/organisms/TabButton';

interface TabBarProps {
  children: React.ReactNode;
  firstTabButtonText: string;
  secondTabButtonText: string;
}

export function TabBar({
  children,
  secondTabButtonText,
  firstTabButtonText,
}: TabBarProps) {
  const ref = React.useRef<PagerView>(null);

  const [activePage, setActivePage] = useState(0);
  const handlePageSelected = (
    event: NativeSyntheticEvent<Readonly<{ position: number }>>
  ) => {
    setActivePage(event.nativeEvent.position);
  };

  return (
    <>
      <View className="flex-row bg-primary rounded-[35px] p-0.5 mb-3">
        <TabButton
          onPress={() => ref.current?.setPage(0)}
          index={0}
          activePage={activePage}
          accessibilityLabel={firstTabButtonText}
          accessibilityHint={firstTabButtonText}
        />
        <TabButton
          onPress={() => {
            ref.current?.setPage(1);
          }}
          index={1}
          activePage={activePage}
          accessibilityLabel={secondTabButtonText}
          accessibilityHint={secondTabButtonText}
        />
      </View>
      <PagerView
        onPageSelected={(event) => handlePageSelected(event)}
        initialPage={0}
        ref={ref}
        style={{ flex: 1 }}
      >
        {children}
      </PagerView>
    </>
  );
}
