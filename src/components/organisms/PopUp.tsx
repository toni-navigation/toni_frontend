import React from 'react';
import { Modal, SafeAreaView, View } from 'react-native';

import { Button } from '@/components/atoms/Button';

interface PopUpProps {
  visible: boolean;
  onClick?: () => void;
  onClickButtonText?: string;
  onCloseClick: () => void;
  onCloseButtonText: string;
  children: React.ReactNode;
  onDismiss?: () => void;
}

export function PopUp({
  visible,
  children,
  onClick,
  onClickButtonText,
  onCloseClick,
  onCloseButtonText,
  onDismiss,
}: PopUpProps) {
  return (
    <Modal
      animationType="slide"
      visible={visible}
      testID="modal"
      onRequestClose={onCloseClick}
      onDismiss={onDismiss}
    >
      <SafeAreaView className="bg-background">
        <View className="justify-center items-center h-full w-full p-4">
          <View className="flex justify-between items-center w-full h-full rounded-[35px] p-4 bg-primary">
            <View className="flex flex-col items-center justify-center flex-1">
              {children}
            </View>

            <View className="mx-5 w-full">
              {onClick && onClickButtonText && (
                <Button width="full" onPress={onClick} buttonType="accent">
                  {onClickButtonText}
                </Button>
              )}
              <Button
                width="full"
                onPress={onCloseClick}
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
