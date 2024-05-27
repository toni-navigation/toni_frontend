import { router } from 'expo-router';
import React from 'react';
import { Modal, SafeAreaView, Text, useColorScheme, View } from 'react-native';

import * as icons from '@/assets/icons/icons';
import { Button, ButtonTypes } from '@/components/atoms/Button';
import { Header } from '@/components/atoms/Header';

export type IconByKey = keyof typeof icons;

interface PopUpProps {
  visible: boolean;
  popupType: PopUpTypes;
  onSadButtonClick?: () => void;
  // onClickButtonText?: string;
  onClickHappyButton: () => void;
  // onCloseButtonText: string;
  // children: React.ReactNode;
  flexibleText?: string;
}

export type PopUpTypes = 'alert' | 'info' | 'warning';
interface PopUpButtonProps {
  text: string;
  type: ButtonTypes;
}
interface PopUpBase {
  happyButton: PopUpButtonProps;
  sadButton?: PopUpButtonProps;
  text?: string;
  headerText?: string;
}
type PopUpType = {
  [key in PopUpTypes]: PopUpBase;
};
// interface PopUpType {
//   [key: PopUpTypes]: {
//     happyButton: {
//       text: string;
//       type: 'accent' | 'primary';
//     };
//     sadButton?: {
//       text: string;
//       type: 'primaryOutline';
//     };
//   };
// }
const popUpObj: PopUpType = {
  alert: {
    happyButton: {
      text: 'Alles klar!',
      type: 'accent',
    },
    headerText: 'Hinweis',
    text: 'Solltest du öffentliche Verkehrsmittel nutzen, gib bitte die nächste Haltestelle ein. Toni verfügt nur über die Navigation von Fußwegen.',
  },
  warning: {
    sadButton: {
      text: 'Beenden',
      type: 'accentOutline',
    },
    happyButton: {
      text: 'Schließen',
      type: 'accent',
    },
    text: 'Möchtest du die Navigation wirklich beenden?',
  },
  info: {
    sadButton: {
      text: 'Zurück',
      type: 'accentOutline',
    },
    happyButton: {
      text: 'Weiter',
      type: 'accent',
    },
    // text: 'Deine Route beträgt:',
    headerText: 'Route Übersicht',
  },
};

export function PopUp({
  visible,
  onSadButtonClick,
  onClickHappyButton,
  popupType,
  flexibleText,
}: PopUpProps) {
  const colorscheme = useColorScheme();
  // <View className="w-full">
  //   {onClick && onClickButtonText && (
  //     <Button onPress={onClick} buttonType="primaryOutline">
  //       {onClickButtonText}
  //     </Button>
  //   )}
  //   <Button onPress={onCloseClick} buttonType="primary">
  //     {onCloseButtonText}
  //   </Button>
  // </View>;
  const sadButtonType = popUpObj[popupType].sadButton?.type;
  const sadButtonText = popUpObj[popupType].sadButton?.text;
  const text = popUpObj[popupType].text ?? flexibleText;
  const handleSadButtonClick = () => {
    if (onSadButtonClick) {
      onSadButtonClick();
    }
    router.back(); // Navigate back
  };

  return (
    <Modal
      animationType="slide"
      visible={visible}
      onRequestClose={() => {
        onClickHappyButton();
      }}
      onDismiss={handleSadButtonClick}
    >
      <SafeAreaView
        className={` ${colorscheme === 'light' ? 'bg-background-light' : 'bg-background-dark'}`}
      >
        <View className="justify-center items-center h-full w-full p-4">
          <View
            className={`flex justify-between items-center w-full h-full rounded-[35px] p-4 ${colorscheme === 'light' ? ' bg-primary-color-dark' : ' bg-primary-color-light'}`}
          >
            <View className="flex flex-col items-center justify-center flex-1">
              {popUpObj[popupType].headerText && (
                <Header
                  classes={`${colorscheme === 'dark' ? 'text-text-color-light' : 'text-text-color-dark'}`}
                >
                  {popUpObj[popupType].headerText}
                </Header>
              )}
              {text && (
                <Text
                  className={`text-2xl text-text-col font-atkinsonRegular text-center ${colorscheme === 'light' ? 'text-text-color-dark' : 'text-text-color-light'}`}
                >
                  {text}
                </Text>
              )}
            </View>

            <View className="mx-5 w-full">
              {sadButtonType !== undefined && onSadButtonClick && (
                <Button
                  onPress={handleSadButtonClick}
                  buttonType={sadButtonType}
                >
                  {sadButtonText}
                </Button>
              )}
              <Button
                onPress={onClickHappyButton}
                buttonType={popUpObj[popupType].happyButton.type}
              >
                {popUpObj[popupType].happyButton.text}
              </Button>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
}
