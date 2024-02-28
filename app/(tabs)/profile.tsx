import Calibration from '../../src/pages/Calibration';
import { SafeAreaView, ScrollView, useColorScheme } from 'react-native';

export default function Page() {
  const colorscheme = useColorScheme();

  return (
    <SafeAreaView
      className={`flex-1 ${colorscheme === 'light' ? 'bg-background-light' : 'bg-background-dark'}`}
    >
      {/* eslint-disable-next-line react/jsx-no-undef */}
      <ScrollView className="mx-5 my-5">
        <Calibration />
      </ScrollView>
    </SafeAreaView>
  );
}
