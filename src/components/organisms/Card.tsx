import React from 'react';
import { StyleSheet, View } from 'react-native';

interface CardProps {
  icon?: React.ReactNode;
  children: React.ReactNode;
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 24, // 3xl equivalent
    backgroundColor: 'invertedPrimary', // Replace with your primary color
    padding: 16, // p-4 equivalent
    shadowColor: '#000',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 5, // For Android shadow
  },
});
// TODO: Add accessibilityLabel and accessibilityRole
export function Card({ icon, children }: CardProps) {
  return (
    <View
      style={styles.card}
      className="rounded-3xl bg-invertedPrimary drop-shadow-[4px_4px_10px_rgba(0,0,0,1)] flex-1"
    >
      {children}
      {/* {icon && icon} */}
      {/* <Text className="font-generalSansSemi text-4xl pb-8 text-center text-primary"> */}
      {/*  {children} */}
      {/* </Text> */}
    </View>
  );
}
