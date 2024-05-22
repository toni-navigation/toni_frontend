import React from 'react';
import {
  Alert,
  Modal,
  SafeAreaView,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import * as icons from '@/assets/icons/icons';
import { Button } from '@/components/atoms/Button';

export type IconByKey = keyof typeof icons;

interface PopUpProps {
  visible: boolean;
  onClick?: () => void;
  onClickButtonText?: string;
  onCloseClick: () => void;
  onCloseButtonText: string;
  children: React.ReactNode;
}

export function PopUp({
  visible,
  children,
  onClick,
  onClickButtonText,
  onCloseClick,
  onCloseButtonText,
}: PopUpProps) {
  const colorscheme = useColorScheme();

  return (
    <Modal
      animationType="slide"
      visible={visible}
      onRequestClose={onCloseClick}
    >
      <SafeAreaView>
        <View className="justify-center items-center h-full w-full p-4">
          <View
            className={`flex justify-between items-center w-full h-full rounded-[35px] p-4 ${colorscheme === 'light' ? ' bg-primary-color-dark' : ' bg-primary-color-light'}`}
          >
            <View className="flex flex-col items-center justify-center flex-1">
              {children}
            </View>

            <View className="mx-5 w-full">
              {onClick && onClickButtonText && (
                <Button onPress={onClick} disabled={false} buttonType="accent">
                  {onClickButtonText}
                </Button>
              )}
              <Button
                onPress={onCloseClick}
                disabled={false}
                buttonType={onClick ? 'accentOutline' : 'accent'}
              >
                {onCloseButtonText}
              </Button>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
}
