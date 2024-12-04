import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface FavoritesCardProps {
  children: React.ReactNode;
  onPress: () => void;
  icon: React.ReactNode;
}

export function FavoritesCard({ children, onPress, icon }: FavoritesCardProps) {
  return (
    <TouchableOpacity
      accessibilityRole="button"
      accessibilityHint=""
      accessibilityLabel={`${children}`}
      onPress={onPress}
      className="flex flex-row items-center justify-between rounded-[25px] h-32 mb-5 py-3 px-6 bg-white shadow-md"
    >
      <View>
        <Text className="font-generalSansSemi text-2xl pb-2 text-primary">
          {children}
        </Text>
        <Text>das ist eine lange adresse</Text>
      </View>
      <View className="pl-2">{icon}</View>
    </TouchableOpacity>
  );
}
