import React from 'react';
import { Modal, SafeAreaView, ScrollView, View } from 'react-native';

import * as icons from '@/assets/icons/icons';
import { Button } from '@/components/atoms/Button';

export type IconByKey = keyof typeof icons;

interface RouteOverviewProps {
  visible: boolean;
  onClick?: () => void;
  onClickButtonText?: string;
  onCloseClick: () => void;
  onCloseButtonText: string;
  children: React.ReactNode;
  onDismiss?: () => void;
}

export function RouteOverview({
  visible,
  children,
  onClick,
  onClickButtonText,
  onCloseClick,
  onCloseButtonText,
  onDismiss,
}: RouteOverviewProps) {
  return (
    <Modal
      animationType="slide"
      visible={visible}
      onRequestClose={onCloseClick}
      onDismiss={onDismiss}
    >
      <SafeAreaView>
        <View className="justify-center items-center h-full w-full p-6">
          <ScrollView className="flex flex-col flex-1">{children}</ScrollView>

          <View className="w-full">
            {onClick && onClickButtonText && (
              <Button onPress={onClick} buttonType="primaryOutline">
                {onClickButtonText}
              </Button>
            )}
            <Button onPress={onCloseClick} buttonType="primary">
              {onCloseButtonText}
            </Button>
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
}
