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
      onRequestClose={onCloseClick}
      onDismiss={onDismiss}
    >
      <SafeAreaView className="bg-background">
        <View className="justify-center items-center h-full w-full p-4">
          <View className="flex justify-between items-center w-full h-full rounded-[35px] p-4 bg-invertedPrimary">
            <View className="flex flex-col items-center justify-center flex-1 mx-5">
              {children}
            </View>

            <View className="flex flex-row mx-3 mb-5 gap-1.5">
              <Button
                width={onClick ? 'half' : 'third'}
                onPress={onCloseClick}
                buttonType={onClick ? 'primaryOutlineInverted' : 'primary'}
              >
                {onCloseButtonText}
              </Button>
              {onClick && onClickButtonText && (
                <Button width="half" onPress={onClick} buttonType="accent">
                  {onClickButtonText}
                </Button>
              )}
            </View>
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
}
